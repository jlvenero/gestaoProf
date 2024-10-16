import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/login'
import Class from './pages/class'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Class />
  </StrictMode>,
)
