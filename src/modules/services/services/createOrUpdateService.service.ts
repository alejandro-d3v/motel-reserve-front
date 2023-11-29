import { CreateOrUpdateBaseService } from '../../../shared/services/createOrUpdateBase.service';
import { services } from '../../../shared/constant/services';

export class CreateOrUpdateServiceService extends CreateOrUpdateBaseService<any> {
  url = `${services.api}/services`;
  isFormData = true;
}