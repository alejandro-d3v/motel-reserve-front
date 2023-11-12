import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { TokenService } from '../../../shared/services/token.service';
import { SignOutService } from '../../../shared/services/signOut.service';
import { AuthenticatedUserService } from '../../../shared/services/authenticatedUser.service';

const authenticatedUserService = AuthenticatedUserService();
const signOutService = new SignOutService();
const tokenService = new TokenService();

interface ILogin {
  username: string;
  password: string;
}

export class LoginService {
  async run(data: ILogin) {
    return await axios.post(`${services.api}/auth/token`, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((response) => {
      signOutService.run();

      tokenService.set(response.data.token);
      authenticatedUserService.set(response.data.user);

      return response.data;
    });
  }
}