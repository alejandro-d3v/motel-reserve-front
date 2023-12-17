import { CreateOrUpdateBaseService } from '../../../shared/services/createOrUpdateBase.service';
import { services } from '../../../shared/constant/services';

export class CreateOrUpdateReservationsService extends CreateOrUpdateBaseService<any> {
  url = `${services.api}/reservations`;
}