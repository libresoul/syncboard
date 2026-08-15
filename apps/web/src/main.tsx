import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { makeServer } from './mockServer.ts'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

if (import.meta.env.DEV) {
  makeServer({ environment: 'development' })
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
