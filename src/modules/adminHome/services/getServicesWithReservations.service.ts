import { services } from '../../../shared/constant/services';
import axios from '../../../shared/utils/axios';

interface IParams {
  serviceId?: any;
}

export class GetServicesWithReservationsService {
  async run(params: IParams) {
    return await axios.get<any>(`${services.api}/services/services-with-reservations`, { params }).then(response => response.data);
  }
}