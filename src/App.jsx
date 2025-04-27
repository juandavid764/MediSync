import "./App.css";
import "./index.css";

import { HomePage } from "./pages/HomePage/HomePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage.jsx";
import { AuthPage } from "./pages/AuthPage/AuthPage.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useUser } from "./context/UserContext.jsx";

function App() {
  const { user } = useUser();

  return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/authPage" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Private Routes */}
          <Route
            path="/profile"
            element={
              user ? <ProfilePage /> : <Navigate to="/authPage" />
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
