import { RouteObject } from "react-router-dom";

import Home from "./pages/Home";
import Service from "./pages/Service";

import PaymentFailure from "./pages/PaymentFailure";
import PaymentSuccess from "./pages/PaymentSuccess";

export const homeRouting: RouteObject[] = [
  {
    path: '',
    Component: Home,
  },
  {
    path: 'service/:serviceId',
    Component: Service,
  },

  {
    path: 'service/payment-failure',
    Component: PaymentFailure,
  },
  {
    path: 'service/payment-success',
    Component: PaymentSuccess,
  }
];