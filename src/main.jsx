import { UserProvider } from './context/UserContext.jsx'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <UserProvider>
    <App />
  </UserProvider>
)
