import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SubdomainHandler = () => {
  const navigate = useNavigate()
  const validSubdomains = ['verbete', 'quabogames', 'www', 'localhost']
  const hostname = window.location.hostname
  const subdomain = hostname.split('.')[0]

  useEffect(() => {
    if (!validSubdomains.includes(subdomain)) {
      navigate('/pages/NotFound')
    }
  }, [subdomain, navigate])

  return null
}

export default SubdomainHandler
