import { RouteObject } from "react-router-dom";

import Home from "./pages/Home";
import Service from "./pages/Service";

export const homeRouting: RouteObject[] = [
  {
    path: '',
    Component: Home,
  },
  {
    path: 'service/:serviceId',
    Component: Service,
  }
];