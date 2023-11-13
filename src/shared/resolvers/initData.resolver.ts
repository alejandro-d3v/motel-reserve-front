import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { RoleService } from "../services/role.service";
import { GetMeService } from "../services/getMe.service";
import { SignOutService } from "../services/signOut.service";
import { IsAuthenticatedService } from "../services/isAuthenticated.service";
import { AuthenticatedUserService } from "../services/authenticatedUser.service";

const authenticatedUserService = new AuthenticatedUserService();
const isAuthenticatedService = new IsAuthenticatedService();
const getMeService = new GetMeService();
const roleService = new RoleService();

async function initDataResolver({ request }: LoaderFunctionArgs) {
  console.log('request', request); // delete this

  const isAuth = isAuthenticatedService.run();
  if (!isAuth) return true;

  try {
    const res = await getMeService.run();

    const { role, ...user } = res;

    authenticatedUserService.set(user);
    roleService.set(role);

    return true;
  } catch (e) {
    const signOutService = new SignOutService();

    signOutService.run();

    return redirect('/auth/login');
  }
}

export { initDataResolver };