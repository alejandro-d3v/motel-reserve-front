import * as ReactRouter from "react-router-dom";
import { RouteObject } from "react-router-dom";

import AppNoMatch from "./shared/layouts/AppNoMatch";
import AppEmptyLayout from './shared/layouts/AppEmptyLayout';
import AppAdminLayout from './shared/layouts/AppAdminLayout';

import { initDataResolver } from './shared/resolvers/initData.resolver';

import { homeRouting } from './modules/home/home.routing';
import { authRouting } from './modules/auth/auth.routing';

import { adminHomeRouting } from "./modules/adminHome/adminHome.routing";
import { adminRoomsRouting } from './modules/adminRooms/adminRooms.routing';
import { accessRouting } from "./modules/access/access.routing";

const appRouting: RouteObject[] = [
  {
    path: '/',
    Component: AppEmptyLayout,
    loader: initDataResolver,
    children: [
      {
        path: '',
        Component: AppEmptyLayout,
        children: homeRouting,
      },

      {
        path: 'auth',
        Component: AppEmptyLayout,
        children: authRouting,
      },

      {
        path: 'admin',
        Component: AppAdminLayout,
        children: adminHomeRouting,
      },

      {
        path: 'access',
        Component: AppAdminLayout,
        children: accessRouting,
      },

      {
        path: 'admin-rooms',
        Component: AppAdminLayout,
        children: adminRoomsRouting,
      },
      
      {
        path: '*',
        Component: AppNoMatch,
      }
    ]
  }
];

const router = ReactRouter.createBrowserRouter(appRouting);

export { router }