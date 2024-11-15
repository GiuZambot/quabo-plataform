import { useTranslation } from 'react-i18next'
import styles from './GenericPage.module.scss'

interface GenericPageContentProps {
  imageSrc: string
  imageAltKey: string // Key for translation of the image alt text
  titleKey: string // Key for translation of the title
  descriptionKey: string // Key for translation of the description
}

const GenericPage = ({
  imageSrc,
  imageAltKey,
  titleKey,
  descriptionKey,
}: GenericPageContentProps) => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <div className={styles['generic-content']}>
        <div className={styles['image-content']}>
          <img src={imageSrc} alt={t(imageAltKey)} />
        </div>
        <div className={styles['text-content']}>
          <h1>{t(titleKey)}</h1>
          <p>{t(descriptionKey)}</p>
        </div>
      </div>
    </div>
  )
}

export default GenericPage
