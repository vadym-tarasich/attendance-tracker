import {
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";

const Root = () => (
  <>
    <nav className="p-2 flex gap-3">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </nav>
    <hr />
    <Outlet />
  </>
);

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => (
    <div className="p-2">404 Not Found</div>
  ),
});
