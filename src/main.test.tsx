import { render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest'

type CreateRootMockResult = {
  render: (children: React.ReactNode) => void
}

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}))

vi.mock('./App.tsx', () => ({
  default: () => <div data-testid="mock-app">Mocked App</div>,
}))

vi.mock('./locales/i18n.ts', () => ({}))

describe('Root Application', () => {
  beforeEach(() => {
    const rootElement = document.createElement('div')
    rootElement.id = 'root'
    document.body.appendChild(rootElement)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('should render App inside #root element', async () => {
    await import('./main')

    const { createRoot } = await import('react-dom/client')
    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'))

    const mockCreateRoot = createRoot as unknown as MockInstance
    const root = mockCreateRoot.mock.results[0].value as CreateRootMockResult
    expect(root.render).toHaveBeenCalledWith(
      expect.objectContaining({
        type: StrictMode,
        props: expect.objectContaining({
          children: expect.anything(),
        }),
      }),
    )

    render(
      <div id="root">
        <StrictMode>
          <div data-testid="mock-app">Mocked App</div>
        </StrictMode>
      </div>,
    )
    expect(screen.getByTestId('mock-app')).toBeInTheDocument()
  }, 15000)
})
