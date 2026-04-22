import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BusinessModelCanvas from './BusinessModelCanvas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BusinessModelCanvas />
  </StrictMode>,
)
