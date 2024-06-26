import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { queryClient } from "./lib/react-query";
import { routes } from "./routes";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="expense-manager-theme">
        <QueryClientProvider client={queryClient}>
          <Toaster richColors closeButton />
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
