// src/router/public.routes.tsx
import { lazy } from "react";
import { createRoute } from "../CreateRoutes";

const DashBoard = lazy(() => import("../../pages/protected/Admin/dashboard/index"));
const Products = lazy(() => import("../../pages/protected/Admin/products"));

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"))
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";

import { adminPaths } from "../paths/admin.paths";
import AdminLayout from "../../core/layouts/Admin/AdminLayout";


export const adminRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),
    createRoute({
        path: adminPaths.base,
        layout: AdminLayout,
        children: [
            createRoute({ path: adminPaths.base, element: DashBoard }),
            createRoute({ path: adminPaths.adminViewProducts, element: Products }),
        ]

    }),

];
