// main.jsx

import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './hooks/useAuth'; // Assuming AuthProvider is exported correctly from useAuth.jsx

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
