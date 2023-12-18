import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { RolItemsDto } from '../dtos/rolItems.dto';

export class GetRolItemsService {
  async run(rolId: any) {
    return await axios.get<RolItemsDto[]>(`${services.api}/rolMenu/permissions-by-role/${rolId}`).then(response => response.data);
  }
}