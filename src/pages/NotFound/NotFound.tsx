import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.scss'

// Page to show when a route do not exist
const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className={'page-container'}>
      <div className={styles['not-found-content']}>
        <div className={styles['text-content']}>
          <h1>{t('404')}</h1>
          <h2>{t('Oops... It seems this page has been abducted')}</h2>
          <Button onClick={() => navigate('/')}>
            {t('Fly to the main page')}
          </Button>
        </div>
        <div className={styles['image-content']}></div>
      </div>
    </div>
  )
}

export default NotFound
