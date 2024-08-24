import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, signOut, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuth(null); // Clear the auth state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>FitGenius</h1>
        </Link>
        <nav>
          {user ? (
            <>
            <button>
              <Link to="/">Home</Link>
            </button>
              <button>
                <Link to="/personalised-workouts">Personalised Workouts</Link>
              </button>
              <button
                onClick={() => {
                  signOut();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/about">About</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
