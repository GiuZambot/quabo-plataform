import { Home } from '@pages'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import FatalError from './FatalError'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('FatalError', () => {
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

  it('navigate to / on try again button click', async () => {
    render(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path="/error" element={<FatalError />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    )

    await act(() => fireEvent.click(screen.getByRole('button')))

    expect(screen.getByText('Welcome to Quabo')).toBeInTheDocument()
  })

  it('renders the error illustration', () => {
    render(
      <MemoryRouter>
        <FatalError />
      </MemoryRouter>,
    )
    const illustration = screen.getByAltText('Error page illustration')
    expect(illustration).toBeInTheDocument()
    expect(illustration).toHaveAttribute('src')
  })
})
