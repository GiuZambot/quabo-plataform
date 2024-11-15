import { AppLayout, MfeLoader, ModuleLoader, PageLoader } from '@components'
import { Home, NotFound } from '@pages'
import { ConfigProvider } from 'antd'
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
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="module/:id/*" element={<ModuleLoader />} />
            <Route path="pages/:id" element={<PageLoader />} />
            <Route path="mfe/catalog/*" element={<MfeLoader />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default AppRoutes
