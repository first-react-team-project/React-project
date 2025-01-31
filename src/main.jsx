import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProfilePage from './UserProfilePage'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <UserProfilePage />
  </StrictMode>,
)
