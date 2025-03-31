<template>
    <MainLayout>
        <div class="chat-container">
            <div class="chat-messages" ref="messagesContainer">
                <div v-for="(message, index) in messages" :key="index" class="chat-message" :class="message.sender">
                    <!-- 修改这里：使用v-html渲染Markdown -->
                    <div v-if="message.sender === 'bot'" v-html="renderMarkdown(message.content)"
                        class="markdown-content"></div>
                    <template v-else>{{ message.content }}</template>
                </div>
                <div v-if="isTyping" class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" v-model="userInput" placeholder="输入消息..." @keydown.enter="handleSend"
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
import { ref, computed, watch, nextTick, onUnmounted } from 'vue';
import api from '../api';
import MainLayout from '../layout/MainLayout.vue';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const props = defineProps({
  content: String
})

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true
})

// 安全渲染函数
const renderMarkdown = (content) => {
  if (!content) return ''
  
  // 预处理：修复###问题
  const fixedContent = content
    .replace(/^(#{1,6})\s+/gm, (match, p1) => p1 + ' ') // 规范标题格式
    .replace(/\r\n/g, '\n') // 统一换行符
  
  // 转换Markdown
  const html = md.render(fixedContent)
  
  // 安全过滤
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1','h2','h3','h4','h5','h6',
      'p','br','pre','code','blockquote',
      'ul','ol','li','strong','em','hr',
      'a','img','table','thead','tbody','tr','th','td'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target']
  })
}
const userInput = ref('');
const messages = ref([]);
const isBotResponding = ref(false);
const isTyping = ref(false);
const messagesContainer = ref(null);
let cancelStream = null;

const canSend = computed(() => {
    return userInput.value.trim().length > 0 && !isBotResponding.value;
});

const handleSend = async () => {
    if (!canSend.value) return;

    const question = userInput.value.trim();
    userInput.value = '';

    // 添加用户消息
    messages.value.push({
        sender: 'user',
        content: question,
        timestamp: new Date().toISOString()
    });

    isBotResponding.value = true;
    isTyping.value = true;

    try {
        cancelStream = api.DeepSeekAPI.chatWithDeepSeek(
            question,
            {
                onData: (data) => {
                    try {
                        // 兼容纯文本和JSON格式
                        let content;
                        if (typeof data === 'string') {
                            try {
                                const parsed = JSON.parse(data);
                                content = parsed.choices?.[0]?.delta?.content || parsed.text || data;
                            } catch {
                                content = data; // 直接使用纯文本
                            }
                        } else {
                            content = data.choices?.[0]?.delta?.content || data.text || '';
                        }

                        if (content) {
                            const lastMsg = messages.value[messages.value.length - 1];
                            if (lastMsg?.sender === 'bot' && lastMsg?.isStreaming) {
                                // 追加到现有消息
                                lastMsg.content += content;
                            } else {
                                // 创建新消息
                                messages.value.push({
                                    sender: 'bot',
                                    content: content,
                                    isStreaming: true,
                                    timestamp: new Date().toISOString()
                                });
                            }
                            scrollToBottom();
                        }
                    } catch (error) {
                        console.error('处理消息数据出错:', error);
                    }
                },
                onDone: () => {
                    const lastMsg = messages.value.findLast(m => m.sender === 'bot');
                    if (lastMsg?.isStreaming) {
                        lastMsg.isStreaming = false;
                    }
                    isBotResponding.value = false;
                    isTyping.value = false;
                    cancelStream = null;
                },
                onError: (error) => {
                    console.error('API调用错误:', error);
                    messages.value.push({
                        sender: 'bot',
                        content: '暂时无法处理您的请求，请稍后再试',
                        isStreaming: false,
                        timestamp: new Date().toISOString()
                    });
                    isBotResponding.value = false;
                    isTyping.value = false;
                    cancelStream = null;
                    scrollToBottom();
                }
            }
        );
    } catch (error) {
        console.error('请求初始化失败:', error);
        messages.value.push({
            sender: 'bot',
            content: '无法连接到AI服务',
            isStreaming: false,
            timestamp: new Date().toISOString()
        });
        isBotResponding.value = false;
        isTyping.value = false;
        cancelStream = null;
        scrollToBottom();
    }
};

const cancelRequest = () => {
    if (cancelStream) {
        cancelStream();
        cancelStream = null;
        isBotResponding.value = false;
        isTyping.value = false;

        // 标记最后一条AI消息为完成
        const lastMsg = messages.value.findLast(m => m.sender === 'bot');
        if (lastMsg?.isStreaming) {
            lastMsg.isStreaming = false;
        }
    }
};

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

// 组件卸载时取消请求
onUnmounted(() => {
    cancelRequest();
});

watch(messages, scrollToBottom, { deep: true });
</script>

<style scoped>
:root {
    --primary-color: #5b8cff;
    --user-bg: linear-gradient(135deg, #5b8cff 0%, #3d6ef7 100%);
    --bot-bg: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.chat-container {
    width: 100%;
    height: 90vh;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    padding: 24px;
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chat-header h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.chat-message {
    max-width: 75%;
    padding: 16px 20px;
    border-radius: 20px;
    line-height: 1.5;
    animation: messageAppear 0.3s ease-out;
    position: relative;
    word-break: break-word;
}

.chat-message.user {
    background: var(--user-bg);
    color: white;
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

@media (max-width: 640px) {
    body {
        padding: 10px;
    }

    .chat-container {
        height: 95vh;
        border-radius: 16px;
    }

    .chat-message {
        max-width: 85%;
    }
}

/* 基础样式 */
.markdown-content {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  color: inherit; /* 继承父级颜色 */
}

/* 深度选择器使用新语法 */
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

/* 暗色模式适配 */
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
  
  /* 移除重复定义的 p 和 br 样式 */
}
</style>