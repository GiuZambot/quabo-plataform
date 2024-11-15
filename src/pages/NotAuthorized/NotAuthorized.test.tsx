import NotAuthorized from './NotAuthorized'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('NotAuthorized', () => {
  it('renders correctly with translated text', () => {
    render(<NotAuthorized />)
    expect(screen.getByText('403')).toBeInTheDocument()
    expect(screen.getByText('Access Denied')).toBeInTheDocument()
    expect(screen.getByText('no_permission_description!')).toBeInTheDocument()
  })
})
