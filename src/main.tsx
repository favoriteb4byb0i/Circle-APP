import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ScreenOverview from './ScreenOverview'

const isOverview = window.location.search.includes('overview');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isOverview ? <ScreenOverview /> : <App />}
  </StrictMode>,
)
