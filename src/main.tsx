import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouteProvider } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={true} />
    <QueryClientProvider client={queryClient}>
      <RouteProvider />
    </QueryClientProvider>
  </StrictMode>
)
