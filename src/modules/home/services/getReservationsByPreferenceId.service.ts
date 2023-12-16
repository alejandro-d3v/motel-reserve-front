import axios from '../../../shared/utils/axios';
import { services } from '../../../shared/constant/services';

import { reservationWithServiceDto } from '../dtos/reservations.dto';

export class GetReservationsByPreferenceIdService {
  async run(preferenceId: string): Promise<reservationWithServiceDto> {
    return await axios.get<reservationWithServiceDto>(`${services.api}/reservations/reservations-by-preference-id/${preferenceId}`).then(response => response.data);
  }
}