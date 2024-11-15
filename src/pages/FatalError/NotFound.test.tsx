import FatalError from './FatalError'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

describe('NotFound', () => {
  it('renders correctly with translated text', () => {
    render(
      <MemoryRouter>
        <FatalError />
      </MemoryRouter>,
    )
    expect(screen.getByText('Ops...')).toBeInTheDocument()
    expect(
      screen.getByText('Something went off the planned route'),
    ).toBeInTheDocument()
    expect(screen.getByText('unexpected_error')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
    expect(screen.getByAltText('Error page illustration')).toBeInTheDocument()
  })
})
