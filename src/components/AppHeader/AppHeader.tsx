import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, MenuProps, Space, Typography } from 'antd'
import styles from './AppHeader.module.scss'

const { Header } = Layout
const { Text } = Typography

const userMenu: MenuProps = {
  items: [{ label: 'test', type: 'item', key: 'test' }],
}

const AppHeader = () => {
  return (
    <Header className={styles['app-header']}>
      <Space className={styles['header-content']} size="large">
        <Text strong className={styles.logo}>
          Quabo Games
        </Text>
        <Space className={styles['user-info']}>
          <Dropdown menu={userMenu} trigger={['click']}>
            <Space>
              <Avatar
                icon={<UserOutlined className={styles['avatar-icon']} />}
                className={styles['avatar']}
              />
              <Text className={styles['user-name']}>User Name</Text>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Space>
      </Space>
    </Header>
  )
}

export default AppHeader
