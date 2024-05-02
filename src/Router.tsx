import { RouterProvider, createHashRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/Default";
import { HomePage } from "./pages/Home";
import { StepByStepLabyrinth } from "./components/StepByStepLabyrinth";




const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <HomePage />,
      },
      {
        path: "stepbystep",
        element: <StepByStepLabyrinth />,
      }
    ],
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
