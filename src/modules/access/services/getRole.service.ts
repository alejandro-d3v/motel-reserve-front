import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { RoleDto } from '../../../shared/dto/role.dto';

export class GetRoleService {
  async run(id: any) {
    return await axios.get<RoleDto>(`${services.api}/roles/${id}`).then(response => response.data);
  }
}