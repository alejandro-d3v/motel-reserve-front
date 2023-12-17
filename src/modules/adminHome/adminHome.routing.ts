import { RouteObject } from "react-router-dom";

import AdminHome from "./pages/AdminHome";
import DashboardPage from "./pages/Dashboard";
import ReportsPage from "./pages/Reports";

import serviceWithReservations from "./pages/serviceWithReservations";

export const adminHomeRouting: RouteObject[] = [
  {
    path: 'home',
    Component: AdminHome,
  },
  {
    path: 'home/service-with-reservations/:serviceId',
    Component: serviceWithReservations,
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