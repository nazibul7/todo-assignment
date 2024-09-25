import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderNavigate from './components/Auth0ProviderNavigate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderNavigate>
        <App />
      </Auth0ProviderNavigate>
    </BrowserRouter>
  </StrictMode>,
)
