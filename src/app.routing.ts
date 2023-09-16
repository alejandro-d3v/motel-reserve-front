import * as ReactRouter from "react-router-dom";
import { RouteObject } from "react-router-dom";

import AppNoMatch from "./shared/layouts/AppNoMatch";
import AppEmptyLayout from './shared/layouts/AppEmptyLayout';

import { initDataResolver } from './shared/resolvers/initData.resolver';

import { homeRouting } from './modules/home/home.routing'

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
        path: '*',
        Component: AppNoMatch,
      }
    ]
  }
];

const router = ReactRouter.createBrowserRouter(appRouting);

export { router }