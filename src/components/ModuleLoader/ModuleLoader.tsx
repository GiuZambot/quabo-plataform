import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './ModuleLoader.module.scss'

// ModuleLoader component for loading external modules in an iframe
const ModuleLoader = () => {
  // Extract 'id' and the rest of the URL from the route parameters
  const { game_name = '', '*': restOfUrl } = useParams<{
    game_name: string
    '*': string
  }>()
  const navigate = useNavigate()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Check if a valid ID is provided
  if (game_name === 'undefined' || !game_name) {
    navigate('/pages/NotFound')
  }

  useEffect(() => {
    const handleMessage = (event: { data: { type: string; height: any } }) => {
      if (event.data?.type === 'setHeight' && iframeRef.current) {
        const contentElement = document.querySelector('.content') as HTMLElement
        const minHeight = contentElement?.offsetHeight || 0
        const iframeHeight = Math.max(event.data.height, minHeight)
        iframeRef.current.style.height = `${iframeHeight}px`
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const src = `https://${game_name}.quabogames.com/${restOfUrl}`
  //const src = `https://localhost:3000/`

  // Render the iframe with the corresponding module URL
  return (
    <iframe
      ref={iframeRef}
      data-testid="module-iframe"
      id="module-iframe"
      title={`${game_name} content`}
      className={styles.iframe}
      src={src}
    />
  )
}

export default ModuleLoader
