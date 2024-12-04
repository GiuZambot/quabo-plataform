import {
  AppLayout,
  MfeLoader,
  ModuleLoader,
  PageLoader,
  SubdomainHandler,
} from '@components'
import { Home, NotFound } from '@pages'
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './AppRoutes.scss'

const theme = {
  token: {
    colorTextBase: '#353535',
    fontSize: 16,
  },
  components: {
    Typography: {
      fontFamilyCode:
        "'Nunito', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    },
  },
}

const AppRoutes = () => {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight
      window.parent.postMessage({ type: 'setHeight', height }, '*')
    }

    if (window.self !== window.top) {
      window.addEventListener('load', sendHeight)
      window.addEventListener('resize', sendHeight)

      const observer = new MutationObserver(sendHeight)
      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        window.removeEventListener('load', sendHeight)
        window.removeEventListener('resize', sendHeight)
        observer.disconnect()
      }
    }
  }, [])

  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <SubdomainHandler />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="module/:id/*" element={<ModuleLoader />} />
            <Route path="pages/:id" element={<PageLoader />} />
            <Route path="mfe/catalog/*" element={<MfeLoader />} />
            <Route path="games">
              <Route
                path="iframe/:genre/:game_name/*"
                element={<ModuleLoader />}
              />
              <Route path="mfe/:genre/:game_name/*" element={<MfeLoader />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default AppRoutes
