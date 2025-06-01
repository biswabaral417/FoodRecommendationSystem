import React from "react";
import RouteProvider from "../Providers/RouteProvider";
import type { RouteObject } from "react-router-dom";
import ErrorBoundary from "../core/components/boundry/ErrorBoundry";

export interface CreateRouteProps extends Omit<RouteObject, "element" | "index" | "children"> {
    element?: React.LazyExoticComponent<React.FC>;
    layout?: React.ComponentType;  // <-- Accept component type, not element instance
    children?: RouteObject[];
}

export function createRoute({ element, layout, children, ...rest }: CreateRouteProps): RouteObject {
    // Recursively create child routes if any
    const childRoutes = children?.map(child=>child);

    if (layout) {
        const Layout = layout;
        return {
            ...rest,
            element: (
                <RouteProvider>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {/* Render layout with Outlet so children get rendered inside layout */}
                        <Layout />
                    </React.Suspense>
                </RouteProvider>
            ),
            children: childRoutes,
            errorElement: <ErrorBoundary />,
        };
    }

    if (element) {
        const Element = element;
        return {
            ...rest,
            element: (
                <RouteProvider>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Element />
                    </React.Suspense>
                </RouteProvider>
            ),
            children: childRoutes,
            errorElement: <ErrorBoundary />,
        };
    }

    // fallback if no element or layout provided
    return {
        ...rest,
        children: childRoutes,
        errorElement: <ErrorBoundary />,
    };
}
