import { useTranslation } from 'react-i18next'
import styles from './Home.module.scss'

const getSecureRandom = () => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0] / (0xffffffff + 1)
}

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <div className={styles['home-content']}>
        <div className={styles['text-content']}>
          <h1>{t('Welcome to Quabo')}</h1>
          <p>{t('Home')}</p>
        </div>
      </div>
    </div>
  )
}

export default Home
