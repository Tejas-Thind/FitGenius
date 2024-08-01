import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div classname="container">
        <Link to="/">
          <h2>FitGenius</h2>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
