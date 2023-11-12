// import { useAuthenticatedUserStore } from "../stores/AuthenticatedUserStore";

import { UserDto } from "../dto/user.dto";

export function AuthenticatedUserService() {
  const key = 'user';

  function get(): UserDto | null {
    const user = localStorage.getItem(key);

    if (user) return JSON.parse(user);
    return null;
  }

  function set(user: UserDto): void {
    localStorage.setItem(key, JSON.stringify(user));
  }

  return {
    get,
    set
  };
}