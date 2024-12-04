import { AppFooter, AppHeader } from '@components'
import { Button, Drawer, Layout, Radio, RadioChangeEvent } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import i18n from '../../locales/i18n'

const { Content } = Layout

const AppLayout = () => {
  const { t } = useTranslation()
  const [openLanguageDrawer, setOpenLanguageDrawer] = useState(false)
  const localStorageLang = localStorage.getItem('i18nextLng')
  const initialLang = localStorageLang ?? 'pt-BR'
  const [languageSelected, setLanguageSelected] = useState(initialLang)
  const isInIframe = window.self !== window.top

  const handleCloseDrawer = () => {
    setOpenLanguageDrawer(false)
  }

  const handleLanguageApply = () => {
    i18n.changeLanguage(languageSelected)
    handleCloseDrawer()
  }

  const handleLanguageOnChange = (evt: RadioChangeEvent) => {
    setLanguageSelected(evt.target.id || 'pt-BR')
  }

  return (
    <>
      <Layout className={`main-layout${isInIframe ? ' iframeMode' : ''}`}>
        <AppHeader />
        <Content className="content">
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
      <Drawer
        title={t('Language')}
        open={openLanguageDrawer}
        onClose={handleCloseDrawer}
      >
        <div>
          <Radio.Group
            onChange={handleLanguageOnChange}
            value={languageSelected}
          >
            <Radio key="radio-lgn-en" name={'radio-lgn'} id="en">
              English
            </Radio>
            <Radio key="radio-lgn-pt-br" name={'radio-lgn'} id="pt-BR">
              Português
            </Radio>
            <Radio key="radio-lgn-es" name={'radio-lgn'} id="es">
              Español
            </Radio>
          </Radio.Group>
        </div>
        <Button onClick={handleLanguageApply}>Save</Button>
      </Drawer>
    </>
  )
}

export default AppLayout
