import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Add this line
import { UserProvider } from './UserContext'; // Import UserProvider from UserContext

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <UserProvider> {/* Wrap App with UserProvider to provide global context */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
