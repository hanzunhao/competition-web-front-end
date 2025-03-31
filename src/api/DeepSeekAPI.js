export default {
    deepSeekChat: (question, onMessage, options = {}) => {
      const {
        onError = (err) => console.error('[DeepSeek]', err),
        onComplete = () => {},
        timeout = 60000,
        headers = {},
        baseURL = '/api/page_3'
      } = options;
  
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        onError(new Error('请求超时'));
      }, timeout);
  
      let isFirstChunk = true;
      let isAborted = false;
  
      fetch(`${baseURL}/chat?question=${encodeURIComponent(question)}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache',
          ...headers
        },
        signal: controller.signal
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP错误: ${response.status}`);
        }
        
        if (!response.body) {
          throw new Error('无可读流数据');
        }
  
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
  
        const processChunk = ({ done, value }) => {
          if (done || isAborted) {
            clearTimeout(timeoutId);
            if (!isAborted) onComplete();
            return;
          }
  
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || '';
  
          lines.forEach(line => {
            if (!line.startsWith('data: ')) return;
            
            const data = line.substring(6).trim();
            if (!data || data === '[DONE]') return;
  
            try {
              const json = JSON.parse(data);
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                onMessage(content, isFirstChunk, false);
                isFirstChunk = false;
              }
            } catch (e) {
              console.warn('[DeepSeek] JSON解析错误:', e);
            }
          });
  
          return reader.read().then(processChunk);
        };
  
        return reader.read().then(processChunk);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        if (!isAborted) onError(err);
      });
  
      // 返回取消函数
      return () => {
        isAborted = true;
        clearTimeout(timeoutId);
        controller.abort();
        onComplete();
      };
    }
  };