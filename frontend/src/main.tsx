import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderNavigate from './components/Auth0ProviderNavigate.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TodoProvider } from "./context/TodoContext.tsx"

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderNavigate>
          <TodoProvider>
            <App />
          </TodoProvider>
        </Auth0ProviderNavigate>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
