import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_APP_BASE,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver()
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      // 按需导入时自定义主题(会引入对应组件的/style/index 而不是 style/css style/css会干扰自定义主题)
      ElementPlus({
        useSource: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    css: {
      // 定义全局变量
      preprocessorOptions: {
        scss: {
          // 引入覆盖el默认变量得变量文件，并且使用
          // 您应该使用 @use 'xxx.scss' as *; 代替 @import 'xxx.scss';。因为 sass 团队说他们最终会删除 @import 语法。
          additionalData: `@use "~/assets/styles/element-var.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0'
    }
  }
})
