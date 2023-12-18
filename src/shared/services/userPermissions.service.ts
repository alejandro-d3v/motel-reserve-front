import { RolItemsDto } from "../../modules/access/dtos/rolItems.dto";

export class UserPermissionsService {
  private key = 'permissions';

  get(): RolItemsDto[] {
    const user = localStorage.getItem(this.key);

    if (user) return JSON.parse(user);
    return [];
  }

  set(permissions: RolItemsDto[]): void {
    localStorage.setItem(this.key, JSON.stringify(permissions));
  }
}