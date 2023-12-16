import axios from '../../../shared/utils/axios';
import { services } from '../../../shared/constant/services';

export class UpdateReservationsPaymentStatusService {
  async run(paymentStatus: number, reservationId: number): Promise<void> {
    await axios.put(`${services.api}/reservations/payment-status/${reservationId}`, { paymentStatus });
  }
}