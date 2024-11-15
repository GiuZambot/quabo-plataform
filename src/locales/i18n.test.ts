import i18n from './i18n'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock language files
vi.mock('./pt-BR.json', () => ({
  default: { hello: 'Olá' },
}))
vi.mock('./en.json', () => ({
  default: { hello: 'Hello' },
}))
vi.mock('./es.json', () => ({
  default: { hello: 'Hola' },
}))

describe('i18n configuration', () => {
  beforeEach(() => {
    // Reset language to default before each test
    i18n.changeLanguage('pt-BR')
  })

  it('should initialize i18n with correct languages', () => {
    expect(i18n.options.resources).toHaveProperty('pt-BR')
    expect(i18n.options.resources).toHaveProperty('en')
    expect(i18n.options.resources).toHaveProperty('es')
  })

  it('should set fallback language to pt-BR', () => {
    expect(i18n.options.fallbackLng).toContain('pt-BR')
  })

  it('should translate correctly for different languages', () => {
    expect(i18n.t('hello')).toBe('Olá')

    i18n.changeLanguage('en')
    expect(i18n.t('hello')).toBe('Hello')

    i18n.changeLanguage('es')
    expect(i18n.t('hello')).toBe('Hola')
  })

  it('should fall back to pt-BR for unknown languages', () => {
    i18n.changeLanguage('fr')
    expect(i18n.t('hello')).toBe('Olá')
  })
})
