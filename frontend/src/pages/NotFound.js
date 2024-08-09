function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist.
      </p>
      <a className="not-found-link" href="/">
        Go back to Home
      </a>
    </div>
  );
}

export default NotFound;
