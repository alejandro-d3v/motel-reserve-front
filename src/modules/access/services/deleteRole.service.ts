import axios from '../../../shared/utils/axios';
import { services } from '../../../shared/constant/services';

export class DeleteRoleService {
  async run(id: number) {
    await axios.delete(`${services.api}/roles/${id}`);
  }
}