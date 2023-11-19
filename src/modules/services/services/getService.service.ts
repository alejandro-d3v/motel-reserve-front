import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

import { ServiceDto } from '../dtos/service.dto';

export class GetServiceService {
  async run(id: any) {
    return await axios.get<ServiceDto>(`${services.api}/services-public/${id}`).then(response => response.data);
  }
}