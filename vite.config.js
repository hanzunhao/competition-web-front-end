import { defineConfig } from 'vite'  
import vue from '@vitejs/plugin-vue'  
import AutoImport from 'unplugin-auto-import/vite'  
import Components from 'unplugin-vue-components/vite'  
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'  

// https://vite.dev/config/  
export default defineConfig({  
  plugins: [  
    vue(),  
    AutoImport({  
      resolvers: [ElementPlusResolver()],  
    }),  
    Components({  
      resolvers: [ElementPlusResolver()],  
    }),  
  ],  
  server: {  
    proxy: {  
      '/api': {  
        target: 'http://localhost:8080', // 后端 API 地址  
        changeOrigin: true,  // 如果需要，改变请求头中的 origin 字段  
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉路径中的 /api 前缀  
      },  
    },  
  },  
});