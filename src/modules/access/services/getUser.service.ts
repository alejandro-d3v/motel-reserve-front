import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { UserWithRoleDto } from '../../../shared/dto/user.dto';

export class GetUserService {
  async run(userId: any) {
    return await axios.get<UserWithRoleDto>(`${services.api}/users/${userId}`).then(response => response.data);
  }
}