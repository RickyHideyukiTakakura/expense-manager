import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { routes } from "./routes";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="expense-manager-theme">
        <RouterProvider router={routes} />
      </ThemeProvider>
    </>
  );
}
