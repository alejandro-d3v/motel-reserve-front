import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { ItemDto } from '../dtos/item.dto';

export class GetItemsByModuleIdService {
  async run(moduleId: any) {
    return await axios.get<ItemDto[]>(`${services.api}/items/${moduleId}`).then(response => response.data);
  }
}