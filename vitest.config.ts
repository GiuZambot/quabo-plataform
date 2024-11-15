import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { alias } from './vite.config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: ['./src/setupTests.ts'],
    reporters: ['vitest-sonar-reporter', 'junit', 'basic'],
    outputFile: {
      'vitest-sonar-reporter': 'test-report.xml',
      junit: 'junit.xml',
    },
    coverage: {
      reporter: ['text', 'html', 'cobertura', 'lcov'],
      reportsDirectory: './coverage/results',
      include: ['src/**'],
      exclude: [
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/setupTests.tsx',
      ],
    },
    css: false,
    alias: {
      '\\.(css|scss)$': 'identity-obj-proxy',
      ...alias,
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
})
