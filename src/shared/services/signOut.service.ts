import { TokenService } from './token.service';

export class SignOutService {
  constructor(
    private tokenService = new TokenService(),
  ) {
  }

  run() {
    this.tokenService.delete();
    localStorage.clear();
  }
}