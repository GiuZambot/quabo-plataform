import * as auth from '@shared'
import { fireEvent, render, screen } from '@testing-library/react'
import Keycloak from 'keycloak-js'
import { describe, expect, it, Mock, vi } from 'vitest'
import i18n from '../../locales/i18n'
import Layout from './Layout'

vi.mock('@shared', () => ({
  useAuth: () => ({
    userData: { firstName: 'Test User' },
    keycloak: { logout: vi.fn() },
  }),
  postLanguageChange: vi.fn(),
}))

vi.mock('../../locales/i18n', () => ({
  default: {
    changeLanguage: vi.fn(),
  },
}))

vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}))

describe('Layout', () => {
  beforeEach(() => {
    ;(i18n.changeLanguage as Mock).mockClear()
    ;(auth.postLanguageChange as Mock).mockClear()
  })

  it('renders correctly', () => {
    render(<Layout />)

    expect(screen.getByTestId('ClbHeader')).toBeInTheDocument()
    expect(screen.getByTestId('clb-sub-menu')).toBeInTheDocument()
    expect(screen.getByTestId('ClbDrawer')).toBeInTheDocument()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
    expect(screen.getAllByTestId('ClbRadioButton')).toHaveLength(3)
  })

  it('closes drawer when handleCloseDrawer is called', () => {
    render(<Layout />)
    fireEvent.click(screen.getByText('T'))
    fireEvent.click(screen.getAllByText('Language')[0])
    expect(screen.queryByTestId('ClbDrawer')).toHaveClass('clb-drawer--open')

    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)

    expect(screen.queryByTestId('ClbDrawer')).not.toHaveClass(
      'clb-drawer--open',
    )
  })

  it('applies the selected language when handleLanguageApply is called', () => {
    const changeLanguageMock = vi.fn()
    vi.mocked(i18n.changeLanguage).mockImplementation(changeLanguageMock)
    render(<Layout />)

    fireEvent.click(screen.getByText('T'))
    fireEvent.click(screen.getAllByText('Language')[0])
    fireEvent.click(screen.getByRole('radio', { name: /português/i }))
    fireEvent.click(screen.getByText('Save'))

    expect(changeLanguageMock).toHaveBeenCalledWith('pt-BR')
    expect(screen.queryByTestId('ClbDrawer')).not.toHaveClass(
      'clb-drawer--open',
    )
  })

  it('calls keycloak.logout when the Logout link is clicked', () => {
    const mockLogout = vi.fn()

    vi.spyOn(auth, 'useAuth').mockReturnValue({
      userData: { firstName: 'Test User' },
      keycloak: { logout: mockLogout } as unknown as Keycloak,
      authenticated: true,
    })

    render(<Layout />)
    fireEvent.click(screen.getByText('T'))
    fireEvent.click(screen.getByText('Logout'))

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  test('should update selected language on handleLanguageOnChange', () => {
    render(<Layout />)

    fireEvent.click(screen.getAllByText('Language')[0])

    const englishRadio = screen.getByLabelText('English') as HTMLInputElement
    fireEvent.click(englishRadio)

    expect(englishRadio.checked).toBe(true)

    fireEvent.click(screen.getByText('Save'))

    expect(i18n.changeLanguage).toHaveBeenCalledWith('en')
    expect(auth.postLanguageChange).toHaveBeenCalled()
  })

  test('should update selected language on handleLanguageChangeByKeyboard on Enter code', () => {
    render(<Layout />)

    fireEvent.click(screen.getAllByText('Language')[0])

    const portugueseRadio = screen.getByLabelText(
      'Português',
    ) as HTMLInputElement
    portugueseRadio.focus()
    fireEvent.keyDown(portugueseRadio, { key: 'Enter', code: 'Enter' })

    expect(portugueseRadio.checked).toBe(true)

    fireEvent.click(screen.getByText('Save'))

    expect(i18n.changeLanguage).toHaveBeenCalledWith('pt-BR')
    expect(auth.postLanguageChange).toHaveBeenCalled()
  })
  test('should update selected language on handleLanguageChangeByKeyboard on NumpadEnter code', () => {
    render(<Layout />)

    fireEvent.click(screen.getAllByText('Language')[0])

    const portugueseRadio = screen.getByLabelText(
      'Português',
    ) as HTMLInputElement
    portugueseRadio.focus()
    fireEvent.keyDown(portugueseRadio, { key: 'Enter', code: 'NumpadEnter' })

    expect(portugueseRadio.checked).toBe(true)

    fireEvent.click(screen.getByText('Save'))

    expect(i18n.changeLanguage).toHaveBeenCalledWith('pt-BR')
    expect(auth.postLanguageChange).toHaveBeenCalled()
  })

  test('should display "User" when userData.firstName is falsy', () => {
    ;(auth.useAuth as Mock).mockReturnValueOnce({
      userData: {},
      keycloak: { logout: vi.fn() },
    })

    render(<Layout />)

    expect(screen.getByText('U')).toBeInTheDocument()
  })

  it('should set initialLang to value from localStorage when it exists', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(
      (key) => {
        if (key === 'i18nextLng') {
          return 'en'
        }
        return null
      },
    )

    render(<Layout />)

    fireEvent.click(screen.getAllByText('Language')[0])

    const englishRadio = screen.getByLabelText('English') as HTMLInputElement

    expect(englishRadio.checked).toBe(true)

    const portugueseRadio = screen.getByLabelText(
      'Português',
    ) as HTMLInputElement
    expect(portugueseRadio.checked).toBe(false)

    const spanishRadio = screen.getByLabelText('Español') as HTMLInputElement
    expect(spanishRadio.checked).toBe(false)

    vi.restoreAllMocks()
  })

  it('should call console.warn when "ChangeLog" is clicked', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    render(<Layout />)

    fireEvent.click(screen.getByText('ChangeLog'))

    expect(consoleWarnSpy).toHaveBeenCalledWith('ChangeLog is a Future Feature')

    consoleWarnSpy.mockRestore()
  })
})
