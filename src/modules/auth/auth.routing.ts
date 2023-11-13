import { RouteObject } from "react-router-dom";

import Login from "./pages/Login"
import Register from './pages/Register';

export const authRouting: RouteObject[] = [
  {
    path: 'login',
    Component: Login,
  },

  {
    path: 'register',
    Component: Register,
  },
];