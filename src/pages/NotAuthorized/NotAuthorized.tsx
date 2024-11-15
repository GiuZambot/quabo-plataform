import { useTranslation } from 'react-i18next'
import styles from './NotAuthorized.module.scss'

// Component for displaying a "Not Authorized" page
const NotAuthorized = () => {
  const { t } = useTranslation()

  return (
    <div className={styles['page-container']}>
      <div className={styles['not-auth-content']}>
        <div className={styles['text-content']}>
          <h1>{t('403')}</h1>
          <h2>{t('Access Denied')}</h2>
          <p>{t('no_permission_description!')}</p>
        </div>
        <div className={styles['image-content']}></div>
      </div>
    </div>
  )
}

export default NotAuthorized
