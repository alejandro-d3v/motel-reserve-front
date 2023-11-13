import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { IsAuthenticatedService } from "../services/isAuthenticated.service";

const isAuthenticatedService = new IsAuthenticatedService();

async function check(): Promise<boolean> {
  const isAuth = isAuthenticatedService.run();
  
  if (isAuth) return true;
  return false;
}

export async function authGuard({ request }: LoaderFunctionArgs) {
  console.log('request in authGuard', request); // delete this

  const isCheck = await check();

  if (!isCheck) return redirect('/auth/login');
  return true;
}