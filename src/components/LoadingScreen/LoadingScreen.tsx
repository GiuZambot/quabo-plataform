import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './LoadingScreen.module.scss'

export const LoadingScreen = () => {
  const { t } = useTranslation()
  return (
    <div className={styles['loading-screen']}>
      <Spin aria-label={t('Loading')}></Spin>
    </div>
  )
}
