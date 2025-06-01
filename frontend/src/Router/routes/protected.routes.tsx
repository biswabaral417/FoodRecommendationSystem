// src/router/protected.routes.tsx
import { lazy } from "react";

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"));
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";
import { createRoute } from "../CreateRoutes";

export const protectedRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),]

