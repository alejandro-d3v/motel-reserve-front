import { RouteObject } from "react-router-dom";

import Roles from "./pages/Roles";
import Users from "./pages/Users";
import UsersCreate from "./pages/UsersCreate";
import UsersEdit from "./pages/UsersEdit";

export const accessRouting: RouteObject[] = [
  {
    path: 'roles',
    Component: Roles,
  },

  {
    path: 'users',
    Component: Users,
  },
  {
    path: 'users/create',
    Component: UsersCreate,
  },
  {
    path: 'users/:userId/edit',
    Component: UsersEdit,
  },
];