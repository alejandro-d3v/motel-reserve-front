import axios from '../../../shared/utils/axios';
import { services } from '../../../shared/constant/services';

export class DeleteServiceService {
  async run(id: number) {
    await axios.delete(`${services.api}/services/${id}`);
  }
}