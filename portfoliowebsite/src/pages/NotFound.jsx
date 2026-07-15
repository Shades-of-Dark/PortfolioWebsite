import { Link } from "react-router";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Sorry, this page doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;