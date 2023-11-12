import { useAuthenticatedUserStore } from "../stores/authenticatedUserStore";

import { UserDto } from "../dto/user.dto";

export class AuthenticatedUserService {
  private key = 'user';

  get(): UserDto | null {
    const user = localStorage.getItem(this.key);

    if (user) return JSON.parse(user);
    return null;
  }

  set(user: UserDto): void {
    localStorage.setItem(this.key, JSON.stringify(user));

    const store = useAuthenticatedUserStore.getState();
    store.set(user);
  }
}