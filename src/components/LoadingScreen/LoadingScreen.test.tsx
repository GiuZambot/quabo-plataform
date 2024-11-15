import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LoadingScreen } from './LoadingScreen'
import styles from './LoadingScreen.module.scss'

// Mock dependencies
vi.mock('@celebration/react', () => ({
  ClbLoading: ({
    'aria-label': ariaLabel,
    type,
    size,
  }: {
    'aria-label': string
    type: string
    size: string
  }) => (
    <div
      data-testid="clb-loading"
      aria-label={ariaLabel}
      data-type={type}
      data-size={size}
    >
      ClbLoading
    </div>
  ),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('LoadingScreen', () => {
  it('renders correctly', () => {
    render(<LoadingScreen />)

    const loadingElement = screen.getByTestId('clb-loading')
    expect(loadingElement).toBeInTheDocument()
    expect(loadingElement).toHaveAttribute('aria-label', 'Loading')
    expect(loadingElement).toHaveAttribute('data-type', 'default')
    expect(loadingElement).toHaveAttribute('data-size', 'lg')

    const loadingScreenDiv = screen.getByTestId('clb-loading').parentElement
    expect(loadingScreenDiv).toHaveClass(styles['loading-screen'])
  })
})
