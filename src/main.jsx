import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

try {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  console.error('Erro ao renderizar app:', error);
  document.getElementById('root').innerHTML = `<div style="color: red; padding: 20px; font-family: monospace;">
    <h2>Erro ao carregar aplicação</h2>
    <p>${error.message}</p>
    <pre>${error.stack}</pre>
  </div>`;
}
