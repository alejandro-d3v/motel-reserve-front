import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { RoleDto } from '../../../shared/dto/role.dto';

export class GetRolesService {
  async run() {
    return await axios.get<RoleDto[]>(`${services.api}/roles`).then(response => response.data);
  }
}