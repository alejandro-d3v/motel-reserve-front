import { TokenService } from "./token.service";

export class IsAuthenticatedService {
  constructor(
    private tokenService = new TokenService(),
  ) {
  }

  run(): string | boolean {
    const token = this.tokenService.get();

    return (token ? token : false);
  }
}