import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App';
import { AuthContextProvider } from './contexts/AuthContext';
import { UserPreferencesContextProvider } from './contexts/UserPreferencesContext';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserPreferencesContextProvider>
        <App />
      </UserPreferencesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
