<template>
    <MainLayout>
        <el-row gutter="20">
            <el-col :span="4">
                <el-button type="primary" @click="startChat">开始对话</el-button>
                <el-button @click="stopChat" :disabled="!isStreaming">停止响应</el-button>

                <div class="mt-3">
                    <el-input v-model="userQuestion" placeholder="输入您的问题" @keyup.enter="startChat" />
                </div>
            </el-col>

            <el-divider direction="vertical" />

            <el-col :span="19">
                <el-input ref="textAreaRef" v-model="displayText" type="textarea" :rows="20" placeholder="AI回复将显示在这里..."
                    readonly resize="none" class="response-textarea" />
                <div v-if="isLoading" class="status-text">AI正在思考中...</div>
                <div v-if="error" class="error-message">{{ error }}</div>
            </el-col>
        </el-row>
    </MainLayout>
</template>

<script setup>
import { ref, onUnmounted, nextTick, computed } from 'vue';
import MainLayout from '../layout/MainLayout.vue'
import api from '../api';

const textAreaRef = ref(null);
const userQuestion = ref('');
const chunks = ref([]); // 使用数组存储响应块
const error = ref('');
const isLoading = ref(false);
const isStreaming = ref(false);
let stopStreamFn = null;

// 计算属性显示文本
const displayText = computed(() => chunks.value.join(''));

const startChat = async () => {
    if (!userQuestion.value.trim()) {
        error.value = '请输入问题内容';
        return;
    }

    resetState();
    isLoading.value = true;
    isStreaming.value = true;

    try {
        stopStreamFn = api.DeepSeekAPI.deepSeekChat(
            userQuestion.value,
            (chunk, isFirst) => {
                console.log('Received chunk:', chunk);

                // 使用数组存储响应块确保响应式更新
                if (isFirst) {
                    chunks.value = [chunk];
                } else {
                    chunks.value.push(chunk);
                }

                // 强制滚动到底部
                nextTick(() => {
                    const textarea = textAreaRef.value?.textarea;
                    if (textarea) {
                        textarea.scrollTop = textarea.scrollHeight;
                        // 额外确保DOM更新的技巧
                        textarea.value = displayText.value;
                    }
                });
            },
            {
                onError: (err) => {
                    console.error('API error:', err);
                    error.value = `请求失败: ${err.message}`;
                    isLoading.value = false;
                    isStreaming.value = false;
                },
                onComplete: () => {
                    console.log('API call completed');
                    isLoading.value = false;
                    isStreaming.value = false;
                },
                timeout: 60000
            }
        );
    } catch (err) {
        console.error('Start chat error:', err);
        error.value = `初始化请求失败: ${err.message}`;
        isLoading.value = false;
        isStreaming.value = false;
    }
};

const stopChat = () => {
    if (stopStreamFn) {
        stopStreamFn();
        isLoading.value = false;
        isStreaming.value = false;
    }
};

const resetState = () => {
    chunks.value = [];
    error.value = '';
};

onUnmounted(() => {
    stopChat();
});
</script>

<style scoped>
/* 原有样式保持不变 */
</style>