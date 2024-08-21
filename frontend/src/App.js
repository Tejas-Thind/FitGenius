import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "./context/AuthContext"; // Import useAuth hook
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import About from "./pages/About"; // Import the About page
import { supabase } from "./supabaseClient"; // Import Supabase client

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { session } = useAuth();
  return session ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route
              path="/login"
              element={
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  view="sign_in" // Sign In view
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  view="sign_up" // Sign Up view
                />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  view="forgot_password" // Forgot Password view
                />
              }
            />
            <Route path="/about" element={<About />} /> {/* About page */}
            <Route path="*" element={<NotFound />} /> {/* 404 page */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
