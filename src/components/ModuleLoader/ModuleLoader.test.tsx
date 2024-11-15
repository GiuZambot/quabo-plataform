import { render, screen } from '@testing-library/react'
import * as reactRouterDom from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as CommAPI from '../../shared/CommAPI/CommAPI'
import ModuleLoader from './ModuleLoader'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: vi.fn(),
  }
})

vi.mock('../../shared/CommAPI/CommAPI', () => ({
  postAuthTokenChange: vi.fn(),
}))

describe('ModuleLoader', () => {
  beforeEach(() => {
    vi.spyOn(reactRouterDom, 'useParams').mockReturnValue({
      id: 'auth',
      '*': '',
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders iframe with correct URL for auth module', () => {
    render(<ModuleLoader />)
    const iframe = screen.getByTestId('module-iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', '')
  })

  it('displays error message for undefined ID', () => {
    vi.spyOn(reactRouterDom, 'useParams').mockReturnValue({
      id: 'undefined',
      '*': '',
    })
    render(<ModuleLoader />)
    expect(screen.getByText('Module ID not provided')).toBeInTheDocument()
  })

  it('displays error message for invalid ID', () => {
    vi.spyOn(reactRouterDom, 'useParams').mockReturnValue({
      id: 'invalid',
      '*': '',
    })
    render(<ModuleLoader />)
    expect(screen.getByText('Invalid ID')).toBeInTheDocument()
  })

  it('calls postAuthTokenChange when receiving a requestAuthToken message', () => {
    render(<ModuleLoader />)
    const message = { data: { type: 'requestAuthToken' } }
    window.dispatchEvent(new MessageEvent('message', message))
    expect(CommAPI.postAuthTokenChange).toHaveBeenCalled()
  })
})
