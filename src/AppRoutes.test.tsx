import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AppRoutes from './AppRoutes'

vi.mock('@shared', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
  useAuth: () => ({ userData: { firstName: 'test' } }),
}))

describe('App Component', () => {
  it('should render the Home component at the root path', () => {
    render(<AppRoutes />)

    expect(screen.getByText(/Welcome to Quabo/i)).toBeInTheDocument()
  })
})
