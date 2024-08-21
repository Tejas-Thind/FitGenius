import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div class="container">
        <div class="tree">
          <div class="branch" style={{ "--x": 0 }}>
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <div class="branch" style={{ "--x": 1 }}>
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <div class="branch" style={{ "--x": 2 }}>
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <div class="branch" style={{ "--x": 3 }}>
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <div class="stem">
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <span class="shadow"></span>
        </div>
      </div>
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist.
      </p>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="button-wrapper">
          <button className="styled-button" type="submit">
            <span className="button-edge"></span>
            <span className="button-front">Go back to Home</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
