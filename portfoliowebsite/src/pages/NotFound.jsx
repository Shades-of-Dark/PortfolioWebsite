import { Link } from "react-router";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="container not-found">
      <h1>404</h1>
      <p>Sorry, this page doesn't exist.</p>
      <Link to="/" className="pill pill-solid">Go back home</Link>
    </div>
  );
}

export default NotFound;