// src/router/protected.routes.tsx
import { lazy } from "react";

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"));
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";
import { createRoute } from "../CreateRoutes";
import { protectedPaths } from "../paths/protected.paths";
import PublicLayout from "../../core/layouts/public/publicLayout";
const MyOrders = lazy(() => import("../../pages/public/myOrders"));

export const protectedRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),
    createRoute({
        path: "/*",
        layout: PublicLayout,
        children: [
            createRoute({ path: protectedPaths.myOrders, element: MyOrders })
        ]

    }),

]