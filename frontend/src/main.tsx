import {
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

// 🔐 One-time TS declaration merging for full type-safety everywhere
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <div>
      <h1>
        Hello, React heh dasd asddasd asd as asd a assd asd
        asd asd asd assad asdd asd asd as dad d asd asd as
        das dasdf sds das ad a fsda fdsf sd d asd asd asd
        asd asfasd asd asd afasd fasd fs e
      </h1>
    </div>
  );
};

const root = ReactDOM.createRoot(
  // biome-ignore lint:noUnusedVars
  document.getElementById("root")!,
);
root.render(<RouterProvider router={router} />);
