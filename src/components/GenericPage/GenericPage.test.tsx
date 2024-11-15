import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import GenericPage from './GenericPage'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('GenericPage', () => {
  it('renders the image with the correct src and alt text', () => {
    const props = {
      imageSrc: 'mockImage.png',
      imageAltKey: 'Portal page illustration',
      titleKey: 'Authorization and Keycloak Portal',
      descriptionKey: 'keycloak_portal_description',
    }

    render(<GenericPage {...props} />)

    const image = screen.getByRole('img', { name: props.imageAltKey })
    expect(image).toHaveAttribute('src', props.imageSrc)
  })

  it('renders the title and description correctly', () => {
    const props = {
      imageSrc: 'mockImage.png',
      imageAltKey: 'Portal page illustration',
      titleKey: 'Authorization and Keycloak Portal',
      descriptionKey: 'keycloak_portal_description',
    }

    render(<GenericPage {...props} />)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent(props.titleKey)

    const description = screen.getByText(props.descriptionKey)
    expect(description).toBeInTheDocument()
  })
})
