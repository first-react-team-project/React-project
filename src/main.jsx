import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './components/Register.jsx'
import Login  from './components/Login.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App/>
  
  </StrictMode>,
)
