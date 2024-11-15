import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './AppRoutes.scss'
import AppRoutes from './AppRoutes.tsx'
import './locales/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
