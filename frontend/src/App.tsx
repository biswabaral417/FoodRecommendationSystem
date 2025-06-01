// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuth from "./Providers/AuthProvider";
import { publicRoutes } from "./Router/routes/public.routes";
import { authRoutes } from "./Router/routes/auth.routes";
import { protectedRoutes } from "./Router/routes/protected.routes";

function App() {
  const { localUser } = useAuth()

  const provideRoutes = () => {
    if (localUser && localUser.isAuthenticated) {
      return [...publicRoutes, ...protectedRoutes]
    }
    return [...publicRoutes, ...authRoutes];

  }
  const router = createBrowserRouter(provideRoutes())
  return <RouterProvider router={router} />;
}

export default App;
