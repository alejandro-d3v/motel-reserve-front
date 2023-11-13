import { RouteObject } from "react-router-dom";

import Roles from "./pages/Roles";
import Users from "./pages/Users";

export const accessRouting: RouteObject[] = [
  {
    path: 'roles',
    Component: Roles,
  },
  {
    path: 'users',
    Component: Users,
  },
];