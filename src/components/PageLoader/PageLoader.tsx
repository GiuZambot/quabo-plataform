import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const pages: {
  [key: string]: () => Promise<{ default: React.ComponentType<unknown> }>
} = {
  FatalError: () => import('../../pages/FatalError/FatalError'),
  Home: () => import('../../pages/Home/Home'),
  NotAuthorized: () => import('../../pages/NotAuthorized/NotAuthorized'),
  NotFound: () => import('../../pages/NotFound/NotFound'),
}

const PageLoader = () => {
  const { id } = useParams<{ id: string }>()
  const [pageComponent, setPageComponent] =
    useState<React.ComponentType<unknown> | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const loadPage = async () => {
        try {
          const module = await pages[id]()
          setPageComponent(() => module.default)
        } catch {
          navigate('/pages/NotFound')
        }
      }
      loadPage()
    }
  }, [id, navigate])

  if (!pageComponent) {
    return <Spin />
  }

  const PageComponent = pageComponent

  return <PageComponent />
}

export default PageLoader
