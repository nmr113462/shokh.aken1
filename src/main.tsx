import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlinkUIProvider, Toaster } from '@blinkdotnew/ui'
import { LanguageProvider } from './hooks/useLanguage'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BlinkUIProvider theme="midnight" darkMode="dark" defaultDarkMode="dark">
          <Toaster />
          <App />
        </BlinkUIProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
