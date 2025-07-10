// src/router/protected.routes.tsx
import { lazy } from "react";

const NotFound = lazy(() => import("../../core/components/NotFound/NotFound"));
import ErrorBoundary from "../../core/components/boundry/ErrorBoundry";
import { createRoute } from "../CreateRoutes";
import { protectedPaths } from "../paths/protected.paths";
import { publicPaths } from "../paths/public.paths";
import ProtectedLayout from "../../core/layouts/protected/ProtectedLayout";


const MyOrders = lazy(() => import("../../pages/public/myOrders"));
const Profile = lazy(() => import("../../pages/protected/profile"));
const Home = lazy(() => import("../../pages/public/home/index"));
const MyCart = lazy(() => import("../../pages/public/myCart"))
const About = lazy(() => import("../../pages/public/about"));

export const protectedRoutes = [
    createRoute({
        path: "*",
        element: NotFound,
        errorElement: <ErrorBoundary />
    }),
    createRoute({
        path: "/",
        layout: ProtectedLayout,
        children: [
            createRoute({ path: publicPaths.home, element: Home }),
            createRoute({ path: publicPaths.about, element: About }),
            createRoute({ path: publicPaths.myCart, element: MyCart }),
            createRoute({ path: protectedPaths.myOrders, element: MyOrders }),
            createRoute({ path: protectedPaths.profile, element: Profile })
        ]

    }),


]