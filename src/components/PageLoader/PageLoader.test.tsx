import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Mock, vi } from 'vitest'
import PageLoader from './PageLoader'

vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('PageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads and renders the correct Home page component', async () => {
    render(
      <MemoryRouter initialEntries={['/pages/Home']}>
        <Routes>
          <Route path="/pages/:id" element={<PageLoader />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Welcome to Quabo')).toBeInTheDocument()
    })
  })

  it('loads and renders the correct AboutAAPortal page component', async () => {
    render(
      <MemoryRouter initialEntries={['/pages/AboutAAPortal']}>
        <Routes>
          <Route path="/pages/:id" element={<PageLoader />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(
        screen.getByText('Authorization and Keycloak Portal'),
      ).toBeInTheDocument()
    })
  })

  it('loads and renders the correct FatalError page component', async () => {
    render(
      <MemoryRouter initialEntries={['/pages/FatalError']}>
        <Routes>
          <Route path="/pages/:id" element={<PageLoader />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Ops...')).toBeInTheDocument()
    })
  })

  it('loads and renders the correct NotAuthorized page component', async () => {
    render(
      <MemoryRouter initialEntries={['/pages/NotAuthorized']}>
        <Routes>
          <Route path="/pages/:id" element={<PageLoader />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('403')).toBeInTheDocument()
    })
  })

  it('loads and renders the correct NotFound page component', async () => {
    render(
      <MemoryRouter initialEntries={['/pages/NotFound']}>
        <Routes>
          <Route path="/pages/:id" element={<PageLoader />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument()
    })
  })

  it('navigates to notFound page when import fails', async () => {
    const mockNavigate = vi.fn()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
    render(
      <MemoryRouter initialEntries={['/page/nonexistentPage']}>
        <Routes>
          <Route path="/page/:id" element={<PageLoader />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/pages/NotFound')
    })
  })
})
