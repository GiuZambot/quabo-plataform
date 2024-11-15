import { Home } from '@pages'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import NotFound from './NotFound'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('NotFound', () => {
  it('renders correctly with translated text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(
      screen.getByText('Oops... It seems this page has been abducted'),
    ).toBeInTheDocument()
    expect(screen.getByText('Fly to the main page')).toBeInTheDocument()
    expect(
      screen.getByAltText('Not found page illustration'),
    ).toBeInTheDocument()
  })

  it('navigate back to / on button click', () => {
    render(
      <MemoryRouter initialEntries={['/not']}>
        <Routes>
          <Route path="/not" element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Fly to the main page'))

    expect(screen.getByText('Welcome to Quabo')).toBeInTheDocument()
  })
})
