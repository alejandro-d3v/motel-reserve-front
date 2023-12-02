import { RouteObject } from "react-router-dom";

import ServicesPage from "./pages/Services";
import ServicesCreate from "./pages/ServicesCreate";
import ServicesEdit from "./pages/ServicesEdit";

export const servicesRouting: RouteObject[] = [
  {
    path: '',
    Component: ServicesPage,
  },
  {
    path: 'create',
    Component: ServicesCreate,
  },
  {
    path: ':serviceId/edit',
    Component: ServicesEdit,
  }
];