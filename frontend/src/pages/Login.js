import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      navigate("/"); // Redirect to the home page upon successful login
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    document.title = "FitGenius | Login",
    <form className="login" onSubmit={handleLogin}>
      <h2 className="form-title">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <div className="button-wrapper">
        <button className="styled-button" type="submit">
          <span className="button-edge"></span>
          <span className="button-front">Login</span>
        </button>
      </div>
    </form>
  );
};

export default Login;
