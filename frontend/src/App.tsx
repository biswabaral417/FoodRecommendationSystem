// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuth from "./Providers/AuthProvider";
import { publicRoutes } from "./Router/routes/public.routes";
import { authRoutes } from "./Router/routes/auth.routes";
import { protectedRoutes } from "./Router/routes/protected.routes";
import { adminRoutes } from "./Router/routes/admin.routes";
import useAppContext from "./Providers/AppProvider";
import React, { useState } from "react";
import ModalWrapper from "./core/components/atoms/wrapper/ModalWrapper";

const App: React.FC<{}> = () => {
  const { localUser } = useAuth()
  const { modalWrapperVis } = useAppContext()
  

  const provideRoutes = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true)
    if (isAdmin === true) {
      return [...adminRoutes];
    }
    else if (localUser && localUser.isAuthenticated) {
      return [...protectedRoutes]
    }
    return [...publicRoutes, ...authRoutes];
  }
  const router = createBrowserRouter(provideRoutes())
  return (
    <>
      <ModalWrapper modalWrapperVis={modalWrapperVis} />
      <RouterProvider router={router} />;
    </>
  )
}


export default App;
