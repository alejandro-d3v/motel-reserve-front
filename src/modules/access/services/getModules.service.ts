import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { ModuleDto } from '../dtos/module.dto';

export class GetModulesService {
  async run() {
    return await axios.get<ModuleDto[]>(`${services.api}/modules`).then(response => response.data);
  }
}