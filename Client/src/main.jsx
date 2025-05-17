import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom'; // ✅ Change to HashRouter
import { UserProvider } from './UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter> {/* ✅ HashRouter here */}
      <UserProvider>
        <App />
      </UserProvider>
    </HashRouter>
  </StrictMode>
);
