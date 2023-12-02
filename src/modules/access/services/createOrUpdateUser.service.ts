import { CreateOrUpdateBaseService } from '../../../shared/services/createOrUpdateBase.service';
import { services } from '../../../shared/constant/services';

export class CreateOrUpdateUserService extends CreateOrUpdateBaseService<any> {
  url = `${services.api}/users`;
  isFormData = true;
}