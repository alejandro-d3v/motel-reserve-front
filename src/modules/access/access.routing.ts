import { RouteObject } from "react-router-dom";

import Roles from "./pages/Roles";
import Users from "./pages/Users";
import UsersCreate from "./pages/UsersCreate";
import UsersEdit from "./pages/UsersEdit";
import RoleAccess from "./pages/RoleAccess";

export const accessRouting: RouteObject[] = [
  {
    path: 'roles',
    Component: Roles,
  },
  {
    path: 'roles/:rolId/access',
    Component: RoleAccess,
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