// src/providers/RouteProvider.tsx
import React from "react";

const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  // Add auth checks, context, etc. here
  return <>{children}</>;
};

export default RouteProvider;
