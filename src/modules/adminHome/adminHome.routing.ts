import { RouteObject } from "react-router-dom";

import AdminHome from "./pages/AdminHome";
import DashboardPage from "./pages/Dashboard";
import ReportsPage from "./pages/Reports";

import serviceWithReservations from "./pages/serviceWithReservations";
import ReportServiceRevenues from "./pages/ReportServiceRevenues";
import ReportByDate from "./pages/ReportByDate";
import ReportReservation from "./pages/ReportReservation";

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
  },
  {
    path: 'reports/service-revenues',
    Component: ReportServiceRevenues,
  },
  {
    path: 'reports/report-by-date',
    Component: ReportByDate,
  },
  {
    path: 'reports/reservation',
    Component: ReportReservation,
  },
];