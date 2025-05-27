// // src/router/protected.routes.tsx
// import { lazy } from "react";
// import { createRoute } from "./createRoute";
// import { protectedPaths } from "./paths";
// import PrivateLayout from "@/layouts/PrivateLayout";

// const Dashboard = lazy(() => import("@/pages/protected/Dashboard"));
// const Settings = lazy(() => import("@/pages/protected/Settings"));

// export const protectedRoutes = [
//   createRoute({
//     path: protectedPaths.dashboard,
//     element: PrivateLayout,
//     children: [
//       createRoute({ path: protectedPaths.dashboard, element: Dashboard }),
//       createRoute({ path: protectedPaths.settings, element: Settings }),
//     ],
//   }),
// ];
