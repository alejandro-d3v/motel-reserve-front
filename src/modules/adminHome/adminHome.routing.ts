import { RouteObject } from "react-router-dom";

import AdminHome from "./pages/AdminHome";

export const adminHomeRouting: RouteObject[] = [
  {
    path: 'home',
    Component: AdminHome,
  }
];