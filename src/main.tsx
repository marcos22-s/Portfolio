import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css' // <--- Mudamos aqui para apontar para o arquivo correto
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)