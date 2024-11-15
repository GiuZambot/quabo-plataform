import { vi } from 'vitest'
import '@testing-library/jest-dom'
import 'systemjs'

// Define a type for the test module
interface TestModule {
  bootstrap: () => Promise<void>
  mount: () => Promise<void>
  unmount: () => Promise<void>
}

const originalImport = System.import

;(System.import as unknown) = vi.fn(
  (moduleName: string): Promise<TestModule> => {
    if (moduleName === '@single-spa/test-module') {
      return Promise.resolve({
        bootstrap: vi.fn().mockResolvedValue(undefined),
        mount: vi.fn().mockResolvedValue(undefined),
        unmount: vi.fn().mockResolvedValue(undefined),
      })
    }
    return originalImport(moduleName) as Promise<TestModule>
  },
)

class MockStorage {
  store: { [key: string]: string }

  constructor() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }
  setItem(key: string, value: string) {
    this.store[key] = (value || '').toString()
  }
  removeItem(key: string) {
    delete this.store[key]
  }
  clear() {
    Object.keys(this.store).forEach((k) => this.removeItem(k))
  }
  get length() {
    return Object.keys(this.store).length
  }
}
const StorageMock = new MockStorage()

Object.defineProperty(window, 'localStorage', {
  value: StorageMock,
})

Object.defineProperty(window, 'sessionStorage', {
  value: StorageMock,
})
