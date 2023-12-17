import axios from '../../../shared/utils/axios';
import { services } from '../../../shared/constant/services';

import { reservationWithServiceDto } from '../dtos/reservations.dto';

export class GetReservationsByCodesService {
  async run(codes: string[]): Promise<reservationWithServiceDto[]> {
    return await axios.post<reservationWithServiceDto[]>(`${services.api}/reservations/reservations-by-codes`, { codes }).then(response => response.data);
  }
}