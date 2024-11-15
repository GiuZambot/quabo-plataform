import { LinkedinOutlined } from '@ant-design/icons'
import { Layout, Typography } from 'antd'
import styles from './AppFooter.module.scss'

const { Footer } = Layout
const { Text, Title } = Typography

const AppFooter = () => {
  return (
    <Footer className={styles['app-footer']}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-info']}>
          <Title level={4} className={styles['footer-title']}>
            Quabo Games
          </Title>
          <Text className={styles['footer-email']}>quabogames@gmail.com</Text>
          <Text className={styles['footer-copyright']}>
            Copyright © 2024 Quabo Games. Todos os direitos reservados.
          </Text>
        </div>
        <div className={styles['footer-social']}>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className={styles['linkedin-icon']} />
          </a>
        </div>
      </div>
    </Footer>
  )
}

export default AppFooter
