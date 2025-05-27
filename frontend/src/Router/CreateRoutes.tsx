// src/router/createRoute.tsx
import React from "react";
import RouteProvider from "../Providers/RouteProvider";
import type { RouteObject } from "react-router-dom";
import  ErrorBoundary from "../core/components/boundry/ErrorBoundry";



export interface CreateRouteProps extends Omit<RouteObject, "element" | "index"> {
    element: React.LazyExoticComponent<React.FC>;
}



export function createRoute({ element, ...rest }: CreateRouteProps): RouteObject {
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
        errorElement: <ErrorBoundary/>,
    };
}
