import request from '../utils/request';

const chatWithDeepSeek = (question, callbacks) => {
  // 确保URL正确拼接
  const url = `/api/page_3/chat?question=${encodeURIComponent(question)}`;
  console.log('Connecting to SSE:', url);

  const eventSource = new EventSource(url);

  eventSource.onopen = () => {
    console.log('SSE连接已建立');
    callbacks.onConnect?.(); // 可选：添加连接成功回调
  };

  eventSource.onmessage = (event) => {
    try {
      if (event.data === '[DONE]') {
        callbacks.onDone?.();
        eventSource.close();
        return;
      }

      // 更安全的JSON解析
      let content = event.data;
      try {
        const parsed = JSON.parse(event.data);
        content = parsed.choices?.[0]?.delta?.content || parsed.text || event.data;
      } catch {
        // 保持原始内容
      }
      callbacks.onData?.({ text: content });
    } catch (error) {
      console.error('处理SSE消息出错:', error);
      callbacks.onError?.(error);
    }
  };

  eventSource.onerror = (error) => {
    // 只有当连接异常关闭时才报错（readyState !== 2）
    if (eventSource.readyState !== EventSource.CLOSED) {
      console.error('SSE异常中断:', error);
      callbacks.onError?.(error);
    } else {
      console.log('SSE连接正常关闭');
    }
    eventSource.close();
  };

  return () => {
    console.log('关闭SSE连接');
    eventSource.close();
  };
};

const getChatHistory = async (userId) => {
  try {
    const response = await request.get('/api/page_3/history', {
      params: { userId },
      timeout: 10000
    });
    return response.data || [];
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('获取历史记录失败:', error);
    }
    return [];
  }
};

const clearChatHistory = async (userId) => {
  try {
    await request.delete('/api/page_3/history', {
      params: { userId }
    });
    return true;
  } catch (error) {
    console.error('清除历史记录失败:', error);
    return false;
  }
};

export default {
  chatWithDeepSeek,
  getChatHistory,
  clearChatHistory
}
