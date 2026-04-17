import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
