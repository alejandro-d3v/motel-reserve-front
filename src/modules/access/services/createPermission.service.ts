import { CreateOrUpdateBaseService } from '../../../shared/services/createOrUpdateBase.service';
import { services } from '../../../shared/constant/services';

export class CreatePermissionService extends CreateOrUpdateBaseService<any> {
  url = `${services.api}/rolMenu`;
}