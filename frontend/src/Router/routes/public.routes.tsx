// src/router/public.routes.tsx
import { lazy } from "react";
import { createRoute } from "../CreateRoutes";
import { publicPaths } from "../paths/public.paths";

const Home = lazy(() => import("../../pages/public/home/index"));
const SignUp = lazy(() => import("../../pages/auth/signUp"))

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"))
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";
import PublicLayout from "../../core/layouts/public/publicLayout";


export const publicRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),
    createRoute({
        path: publicPaths.home, 
        layout: PublicLayout,
        children: [
            createRoute({ path: publicPaths.home, element: Home }),
            createRoute({ path: publicPaths.about, element: SignUp }),
        ]

    }),

];
