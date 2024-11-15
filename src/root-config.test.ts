import { AppProps, LifeCycleFn } from 'single-spa'
import { describe, expect, it, vi } from 'vitest'
import './root-config'
import { appLoader, waitForElement } from './root-config'

vi.mock('systemjs', () => ({
  import: vi.fn(),
}))

vi.mock('single-spa', async () => {
  const actual = await vi.importActual('single-spa')
  return {
    ...actual,
    registerApplication: vi.fn(),
    start: vi.fn(),
  }
})

describe('appLoader', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('loads the module and returns lifecycle methods', async () => {
    const mockMount = vi.fn()
    const mockBootstrap = vi.fn()
    const mockUnmount = vi.fn()

    vi.mocked(System.import).mockResolvedValueOnce({
      bootstrap: mockBootstrap,
      mount: mockMount,
      unmount: mockUnmount,
    })

    const lifeCycles = await appLoader('@test', '#mfe-container')

    expect(lifeCycles.bootstrap).toBeInstanceOf(Function)
    expect(lifeCycles.mount).toBeInstanceOf(Function)
    expect(lifeCycles.unmount).toBeInstanceOf(Function)
    expect(System.import).toHaveBeenCalledWith('@test')
    expect(lifeCycles).toHaveProperty('bootstrap')
    expect(lifeCycles).toHaveProperty('mount')
    expect(lifeCycles).toHaveProperty('unmount')
  }, 10000)

  it('throws an error if the module does not load correctly', async () => {
    ;(System.import as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      null,
    )

    await expect(appLoader('@test', '#mfe-container')).rejects.toThrow(
      'Module did not load correctly',
    )
  })

  it('waits for the element to appear before mounting', async () => {
    const mockMount = vi.fn()

    vi.mocked(System.import).mockResolvedValueOnce({
      mount: mockMount,
    })

    const waitForElementMock = vi
      .spyOn(document, 'querySelector')
      .mockReturnValue(document.createElement('div'))

    const lifeCycles = await appLoader('@test', '#mfe-container')

    const mountFn = lifeCycles.mount as LifeCycleFn<{
      domElementGetter: () => HTMLElement | null
    }>

    await mountFn({
      domElementGetter: () => document.getElementById('mfe-container'),
    } as { domElementGetter: () => HTMLElement | null } & AppProps)

    expect(waitForElementMock).toHaveBeenCalledWith('#mfe-container')
    expect(mockMount).toHaveBeenCalled()
  })

  it('should use default lifecycles if not provided by the module', async () => {
    const mockModule = {}

    ;(
      System.import as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockModule)

    const lifecycles = await appLoader('test-module', '#test-element')

    expect(lifecycles.bootstrap).toBeDefined()
    expect(lifecycles.mount).toBeDefined()
    expect(lifecycles.unmount).toBeDefined()
  })
})

describe('waitForElement', () => {
  it('resolves when the element is found within the timeout', async () => {
    vi.spyOn(document, 'querySelector').mockReturnValueOnce(
      document.createElement('div'),
    )

    const result = await waitForElement('#mfe-container')
    expect(result).toBeInstanceOf(HTMLElement)
  })

  it('rejects when the element is not found within the timeout', async () => {
    vi.spyOn(document, 'querySelector').mockReturnValueOnce(null)

    await expect(waitForElement('#non-existing-element', 500)).rejects.toThrow(
      'Timeout waiting for element #non-existing-element',
    )
  })
})
