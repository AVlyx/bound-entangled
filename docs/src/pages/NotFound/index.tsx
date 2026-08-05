import { Link } from "react-router-dom";

function NotFound() {
  return (
    <article className="doc">
      <h1 className="doc-title">Page not found</h1>
      <p className="doc-lead">
        That page does not exist. Pick a state from the sidebar, or go back to the{" "}
        <Link to="/">introduction</Link>.
      </p>
    </article>
  );
}

export default NotFound;
