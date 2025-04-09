<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap" rel="stylesheet">
</link>

<template>
    <MainLayout>
        <div class="chat-container">
            <div class="chat-messages" ref="messagesContainer">
                <div v-for="(message, index) in messages" :key="index" class="chat-message" :class="message.sender">
                    <div v-if="message.sender === 'bot'" v-html="renderMarkdown(message.content)"
                        class="markdown-content"></div>
                    <template v-else>{{ message.content }}</template>
                </div>
                <div v-if="isBotResponding" class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <button @click="cancelRequest" class="stop-button">
                        停止生成
                    </button>
                </div>
            </div>
            <div class="pest-button-container">
                <span class="pest-label">现有病虫害：</span>
                <button v-for="(pest, index) in pestStore.list" :key="index" class="pest-button"
                    @click="handlePestClick(pest)">
                    {{ pest }}
                </button>
            </div>
            <div class="chat-input">
                <input type="text" v-model="userInput" placeholder="输入问题..." @keydown.enter="handleSend"
                    :disabled="isBotResponding" />
                <button @click="handleSend" :disabled="!canSend">
                    <svg viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    发送
                </button>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted, onMounted } from 'vue';
import api from '../api';
import MainLayout from '../layout/MainLayout.vue';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import { PestStore } from '../stores/PestStore';

const pestStore = PestStore();

onMounted(async () => {
    await pestStore.refresh();
});
const md = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true
});

const renderMarkdown = (content) => {
    if (!content) return '';

    // 更严格的标题格式处理
    const fixedContent = content
        // 处理所有可能的标题格式变体
        .replace(/^(#{1,6})([^#\s])(.*)$/gm, (match, hashes, firstChar, rest) => `${hashes} ${firstChar}${rest}`)
        // 确保标题后有空格
        .replace(/^(#{1,6})\s*/gm, (match, p1) => `${p1} `)
        // 处理Windows换行符
        .replace(/\r\n/g, '\n');

    const html = md.render(fixedContent);
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'pre', 'code', 'blockquote',
            'ul', 'ol', 'li', 'strong', 'em', 'hr',
            'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target']
    });
};
const userInput = ref('');
const messages = ref([]);
const isBotResponding = ref(false);
const messagesContainer = ref(null);
let cancelStream = null;

const canSend = computed(() => {
    return userInput.value.trim().length > 0 && !isBotResponding.value;
});

const handleStreamData = (data) => {
    try {
        let content = typeof data === 'string'
            ? tryParseJson(data)?.choices?.[0]?.delta?.content || data
            : data.choices?.[0]?.delta?.content || data.text || '';

        if (content) {
            const lastMsg = messages.value[messages.value.length - 1];
            if (isBotMessageStreaming(lastMsg)) {
                lastMsg.content += content;
            } else {
                messages.value.push(createBotMessage(content, true));
            }
        }
    } catch (error) {
        console.error('处理消息数据出错:', error);
    }
};

const handleStreamDone = () => {
    const lastMsg = messages.value.findLast(m => m.sender === 'bot');
    if (lastMsg?.isStreaming) {
        lastMsg.isStreaming = false;
    }
    isBotResponding.value = false;
    cancelStream = null;
};

const handleStreamError = (error, context) => {
    console.error('API调用错误:', error);
    messages.value.push(createBotMessage(
        context ? `获取【${context}】信息失败，请稍后再试` : '暂时无法处理您的请求，请稍后再试',
        false
    ));
    isBotResponding.value = false;
    cancelStream = null;
};

const callChatAPI = async (question, customContent = null) => {
    isBotResponding.value = true;
    messages.value.push({
        sender: 'user',
        content: customContent || question,
        timestamp: new Date().toISOString()
    });

    try {
        cancelStream = api.DeepSeekAPI.chatWithDeepSeek(
            question,
            {
                onData: handleStreamData,
                onDone: handleStreamDone,
                onError: (error) => handleStreamError(error, customContent || question)
            }
        );
    } catch (error) {
        handleStreamError(error, customContent || question);
    }
};

const handleSend = async () => {
    if (!canSend.value) return;
    await callChatAPI(userInput.value.trim());
    userInput.value = '';
};

const handlePestClick = async (pest) => {
    if (!pest || isBotResponding.value) return;
    const question = `请提供关于【${pest}】的以下信息：
        1. 基本特征
        2. 危害症状
        3. 防治方法
        4. 推荐农药（如有）
        请用专业但易懂的语言回答，并分点说明。`;
    await callChatAPI(question, `[病虫害咨询] ${pest}`);
};

const cancelRequest = () => {
    cancelStream?.();
    cancelStream = null;
    isBotResponding.value = false;

    const lastMsg = messages.value.findLast(m => m.sender === 'bot');
    if (lastMsg?.isStreaming) {
        lastMsg.isStreaming = false;
    }
};

const scrollToBottom = () => {
    nextTick(() => {
        messagesContainer.value?.scrollTo({
            top: messagesContainer.value.scrollHeight,
            behavior: 'smooth'
        });
    });
};

const tryParseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
};

const isBotMessageStreaming = (msg) => {
    return msg?.sender === 'bot' && msg?.isStreaming;
};

const createBotMessage = (content, isStreaming) => ({
    sender: 'bot',
    content,
    isStreaming,
    timestamp: new Date().toISOString()
});

onUnmounted(() => {
    cancelRequest();
});

watch(messages, scrollToBottom, { deep: true });
</script>

<style scoped>
.pest-button-container {
    width: 98.5%;
    height: 45px;
    margin: 10px;
    background: white;
    border: 1px solid #ccc;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.pest-label {
    font-weight: bold;
    margin-right: 8px;
    margin-left: 8px;
    font-size: 18px !important;
}

.pest-button {
    padding: 6px 12px;
    background-color: #f0f8ff;
    border: 1px solid #5b8cff;
    border-radius: 16px;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
    font-size: 16px !important;
}

.pest-button:hover {
    background-color: #5b8cff;
    color: white;
}

.stop-button {
    margin-left: 16px;
    padding: 4px 12px;
    background: #ff5b5b;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.stop-button:hover {
    background: #ff3a3a;
    transform: translateY(-1px);
}

:root {
    --primary-color: #5b8cff;
    --user-bg: linear-gradient(135deg, #5b8cff 0%, #3d6ef7 100%);
    --bot-bg: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.chat-container {
    background-image: url('../assets/WebIcon.svg');  /* 使用@/别名确保路径正确 */
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;  /* 可选，根据需求决定是否固定背景 */
    font-family: "SimSun", "宋体", serif !important;
    font-size: 16px;
    width: 100%;
    height: 100%;
    background-color: rgba(247, 242, 242, 0.95);  /* 添加半透明背景色 */
    border-radius: 20px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;  /* 为子元素定位提供参考 */
}

/* 添加半透明覆盖层 */
.chat-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(247, 242, 242, 0.8);  /* 调整透明度 */
    z-index: -1;  /* 确保在内容之下 */
    border-radius: 20px;
}

.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 18px !important;
    /* 消息正文放大 */
}

.chat-message {
    max-width: 95%;
    padding: 16px 20px;
    border-radius: 20px;
    line-height: 1.5;
    animation: messageAppear 0.3s ease-out;
    position: relative;
    word-break: break-word;
}

.chat-message.user {
    background: var(--user-bg);
    color: black;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
    box-shadow: var(--shadow);
}

.chat-message.bot {
    background: var(--bot-bg);
    color: #2d3748;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    box-shadow: var(--shadow);
    width: 90%;
}

.chat-input {
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 12px;
}

.chat-input input {
    flex: 1;
    padding: 14px 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.8);
    font-size: 18px !important;
    font-family: "SimSun", "宋体", serif;
}

.chat-input input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(91, 140, 255, 0.2);
}

.chat-input button {
    padding: 12px 24px;
    border: none;
    border-radius: 16px;
    background: var(--primary-color);
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px !important;
}

.chat-input button:hover {
    background: #406cff;
    transform: translateY(-1px);
}

.chat-input button:disabled {
    background: #c2d1ff;
    cursor: not-allowed;
    transform: none;
}

.chat-input button svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
}

@keyframes messageAppear {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.typing-indicator {
    display: inline-flex;
    gap: 6px;
    padding: 12px 20px;
    background: var(--bot-bg);
    border-radius: 20px;
    align-self: flex-start;
    align-items: center;
}

.typing-dot {
    width: 8px;
    height: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-4px);
    }
}

.markdown-content {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.6;
    color: inherit;
}

.markdown-content :deep(p) {
    margin: 0.5em 0;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
    margin: 1em 0 0.5em;
    font-weight: bold;
    color: inherit;
}

.markdown-content :deep(h1) {
    font-size: 1.8em !important;
}

.markdown-content :deep(h2) {
    font-size: 1.6em !important;
}

.markdown-content :deep(h3) {
    font-size: 1.4em !important;
}

.markdown-content :deep(h4) {
    font-size: 1.3em !important;
}

.markdown-content :deep(h5) {
    font-size: 1.2em !important;
}

.markdown-content :deep(h6) {
    font-size: 1.1em !important;
}

.markdown-content :deep(h1) {
    font-size: 1.5em;
    border-bottom: 1px solid var(--border-color, #eee);
    padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
    font-size: 1.3em;
    border-bottom: 1px solid var(--border-color, #eee);
    padding-bottom: 0.3em;
}

.markdown-content :deep(code) {
    font-family: monospace;
    background-color: var(--code-bg, rgba(175, 184, 193, 0.2));
    padding: 0.2em 0.4em;
    border-radius: 3px;
}

.markdown-content :deep(pre) {
    background-color: var(--pre-bg, #f6f8fa);
    padding: 1em;
    border-radius: 6px;
    overflow: auto;
}

.markdown-content :deep(pre code) {
    background-color: transparent;
    padding: 0;
}

.markdown-content :deep(blockquote) {
    border-left: 4px solid var(--quote-border, #dfe2e5);
    color: var(--quote-text, #6a737d);
    padding: 0 1em;
    margin: 0.5em 0;
}

.markdown-content :deep(a) {
    color: var(--link-color, #0366d6);
    text-decoration: none;
}

.markdown-content :deep(a:hover) {
    text-decoration: underline;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
    padding-left: 2em;
    margin: 0.5em 0;
}

.markdown-content :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 0.5em 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
    border: 1px solid var(--table-border, #dfe2e5);
    padding: 6px 13px;
}

.markdown-content :deep(th) {
    background-color: var(--table-header-bg, #f6f8fa);
    font-weight: bold;
}

@media (prefers-color-scheme: dark) {
    :root {
        --border-color: #444;
        --code-bg: rgba(110, 118, 129, 0.4);
        --pre-bg: #2d2d2d;
        --quote-border: #3b434b;
        --quote-text: #8b949e;
        --link-color: #58a6ff;
        --table-border: #444;
        --table-header-bg: #161b22;
    }
}
</style>