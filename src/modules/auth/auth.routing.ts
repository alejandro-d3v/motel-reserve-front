import { RouteObject } from "react-router-dom";

import Login from "./pages/Login"

export const authRouting: RouteObject[] = [
  {
    path: 'login',
    Component: Login,
  },
  
];