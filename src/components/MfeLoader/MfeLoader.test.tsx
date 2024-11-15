import { describe, expect, it } from 'vitest'
import { MfeLoader } from './MfeLoader'
import { render, screen } from '@testing-library/react'

describe('MfeLoader', () => {
  it('renders correctly', () => {
    render(<MfeLoader />)

    const mfeContainer = screen.getByTestId('mfe-container')
    expect(mfeContainer).toBeInTheDocument()
    expect(mfeContainer).toHaveAttribute('id', 'mfe-container')
  })
})
