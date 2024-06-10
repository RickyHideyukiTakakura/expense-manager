import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import { AppLayout } from "./pages/_layout/app";
import { AuthLayout } from "./pages/_layout/auth";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Expenses } from "./pages/app/expenses/expenses";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

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
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
