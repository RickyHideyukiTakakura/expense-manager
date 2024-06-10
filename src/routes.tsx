import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layout/app";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Expenses } from "./pages/app/expenses/expenses";
import { NotFound } from "./pages/404";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
