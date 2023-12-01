import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { UserWithRoleDto } from '../../../shared/dto/user.dto';

interface IParams {
  search?: string;
}

export class GetUsersService {
  async run(params: IParams) {
    return await axios.get<UserWithRoleDto[]>(`${services.api}/users`, { params }).then(response => response.data);
  }
}