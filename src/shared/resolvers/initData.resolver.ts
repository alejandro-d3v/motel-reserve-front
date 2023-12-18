import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { RoleService } from "../services/role.service";
import { GetMeService } from "../services/getMe.service";
import { SignOutService } from "../services/signOut.service";
import { IsAuthenticatedService } from "../services/isAuthenticated.service";
import { UserPermissionsService } from "../services/userPermissions.service";
import { AuthenticatedUserService } from "../services/authenticatedUser.service";
import { GetRolItemsService } from "../../modules/access/services/getRolItems.service";

const authenticatedUserService = new AuthenticatedUserService();
const isAuthenticatedService = new IsAuthenticatedService();
const userPermissionsService = new UserPermissionsService();
const getRolItemsService = new GetRolItemsService();
const getMeService = new GetMeService();
const roleService = new RoleService();

async function initDataResolver({ request }: LoaderFunctionArgs) {
  console.log('request', request); // delete this

  const isAuth = isAuthenticatedService.run();
  if (!isAuth) return true;

  try {
    const res = await getMeService.run();
    
    const { role, ...user } = res;

    const permissions = await getRolItemsService.run(role.id)

    userPermissionsService.set(permissions);
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