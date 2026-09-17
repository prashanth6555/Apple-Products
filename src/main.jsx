import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import App from './App.jsx'
import './index.css'
=======
import './index.css'
import App from './App.jsx'
>>>>>>> d030ef1 (first commit)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
