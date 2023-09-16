import { RouteObject } from "react-router-dom";

import Home from "./pages/Home";
import Room from "./pages/Room";

export const homeRouting: RouteObject[] = [
  {
    path: '',
    Component: Home,
  },
  {
    path: 'room/:roomId',
    Component: Room,
  }
];