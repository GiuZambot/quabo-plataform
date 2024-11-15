import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Home from './Home'
import styles from './Home.module.scss'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('Home Component', () => {
  it('should render welcome message and rocket image', () => {
    render(<Home />)

    expect(screen.getByText('Welcome to Quabo')).toBeInTheDocument()
    expect(screen.getByAltText('Home page illustration')).toBeInTheDocument()
  })

  it('should show UFO after 10 seconds', async () => {
    vi.useFakeTimers()

    render(<Home />)

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(screen.getByAltText('UFO')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('should show explosion when UFO is clicked', async () => {
    vi.useFakeTimers()
    render(<Home />)

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    fireEvent.click(screen.getByTestId('UFO'))
    expect(screen.getByAltText('Explosion')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('UFO')).toHaveClass(styles.hidden)

    vi.useRealTimers()
  })

  it('should set animationPlayState to running for the UFO', async () => {
    vi.useFakeTimers()
    render(<Home />)

    act(() => {
      vi.advanceTimersByTime(11000)
    })

    const ufo = screen.getByTestId('UFO') as HTMLButtonElement

    expect(ufo).toBeInTheDocument()

    expect(ufo.style.animationPlayState).toBe('running')

    vi.useRealTimers()
  })
})
