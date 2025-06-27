// src/router/public.routes.tsx
import { lazy } from "react";
import { createRoute } from "../CreateRoutes";
import { authPaths } from "../paths/auth.paths";

const Login = lazy(() => import("../../pages/auth/login/index"));
const SignUp = lazy(() => import("../../pages/auth/signUp"))

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"))
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";
const AuthLayout = lazy(() => import("../../core/layouts/auth/AuthLayout"))

export const authRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),
    createRoute({
        path: "*",
        element: AuthLayout,
        children: [
            createRoute({ path: authPaths.login, element: Login }),
            createRoute({ path: authPaths.register, element: SignUp }),
        ]
    })
];