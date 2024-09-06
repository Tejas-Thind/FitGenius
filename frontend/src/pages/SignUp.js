import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    document.title = "FitGenius | Sign Up",
    <form className="signup" onSubmit={handleSignUp}>
      <h2 className="form-title">Sign Up</h2>
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
          <span className="button-front">Sign Up</span>
        </button>
      </div>
    </form>
  );
};

export default SignUp;
