import { RouteObject } from "react-router-dom";

import Rooms from "./pages/Rooms";

export const adminRoomsRouting: RouteObject[] = [
  {
    path: 'rooms',
    Component: Rooms,
  }
];