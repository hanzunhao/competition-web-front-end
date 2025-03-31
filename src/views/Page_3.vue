<template>
    <MainLayout>
        <div class="chat-container">
            <div class="chat-messages" ref="messagesContainer">
                <div v-for="(message, index) in messages" :key="index" class="chat-message" :class="message.sender">
                    {{ message.content }}
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

body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.chat-container {
    width: 100%;
    max-width: 800px;
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
</style>