import { RouteObject } from "react-router-dom";

import AdminHome from "./pages/AdminHome";
import DashboardPage from "./pages/Dashboard";
import ReportsPage from "./pages/Reports";

export const adminHomeRouting: RouteObject[] = [
  {
    path: 'home',
    Component: AdminHome,
  },
  {
    path: 'dashboard',
    Component: DashboardPage,
  },
  {
    path: 'reports',
    Component: ReportsPage,
  }
];