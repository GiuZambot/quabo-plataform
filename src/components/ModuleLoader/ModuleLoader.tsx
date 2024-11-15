import { useParams } from 'react-router-dom'
import styles from './ModuleLoader.module.scss'

// ModuleLoader component for loading external modules in an iframe
const ModuleLoader = () => {
  // Extract 'id' and the rest of the URL from the route parameters
  const { id = '', '*': restOfUrl } = useParams<{ id: string; '*': string }>()

  // Check if a valid ID is provided
  if (id === 'undefined') {
    return <div>Module ID not provided</div>
  }

  // Define the URL mapping for different modules
  const url: Record<string, string> = {
    // URL for the authentication module
    auth: `${import.meta.env.VITE_AUTH_URL}/#/${restOfUrl}`,
  }

  // Check if the provided ID corresponds to a valid URL
  if (!url[id]) {
    return <div>Invalid ID</div>
  }

  // Render the iframe with the corresponding module URL
  return (
    <iframe
      data-testid="module-iframe"
      id="module-iframe"
      title={`${id} content`}
      className={styles.iframe}
      src={url[id]}
    />
  )
}

export default ModuleLoader
