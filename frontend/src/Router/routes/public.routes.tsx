// src/router/public.routes.tsx
import { lazy } from "react";
import { createRoute } from "../CreateRoutes";
import { publicPaths } from "../paths/public.paths";

const Login = lazy(() => import("../../pages/auth/login/index"));
const SignUp = lazy(() => import("../../pages/auth/signUp"))

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"))
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";

export const publicRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),
    createRoute({ path: publicPaths.home, element: Login }),
    createRoute({ path: publicPaths.about, element: SignUp }),
];
