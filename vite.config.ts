import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'
import { defineConfig, ViteDevServer } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa'
import tsconfig from './tsconfig.aliases.json'

const { compilerOptions } = tsconfig
const { paths, baseUrl } = compilerOptions

export const alias = Object.entries(paths).reduce(
  (acc: Record<string, string>, [key, value]) => {
    const aliasKey = key.replace('/*', '')
    const aliasPath = value[0].replace('/*', '')
    acc[aliasKey] = path.resolve(__dirname, baseUrl, aliasPath)
    return acc
  },
  {},
)

const customWatcher = (
  options: { filePaths: string[] } = { filePaths: [] },
) => {
  return {
    name: 'custom-watcher',
    configureServer(server: ViteDevServer) {
      options.filePaths.forEach((filePath) => {
        server.watcher.add(filePath)
      })

      function onWatchChange() {
        const timestamp = new Date().getTime()

        server.ws.send({
          type: 'full-reload',
          path: `*?t=${timestamp}`,
        })
      }

      // Observa as mudanças de arquivo
      server.watcher.on('add', onWatchChange)
      server.watcher.on('unlink', onWatchChange)
      server.watcher.on('change', onWatchChange)
    },
  }
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [
      react(),
      vitePluginSingleSpa({
        type: 'root',
        imo: '3.1.1',
        importMaps: {
          type: 'systemjs-importmap',
          dev: ['src/importMap.dev.json'],
          build: ['src/importMap.json'],
        },
      }),
      !isProduction &&
        customWatcher({
          //set the directory to watch
          filePaths: ['../Quabo-Verbete/dist'],
        }),
    ].filter(Boolean),
    build: {
      terserOptions: {
        format: {
          comments: false,
        },
        compress: {
          drop_console: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
        css: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias,
    },
    server: {
      port: 3000,
      host: 'localhost',
      https: {
        key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')),
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
