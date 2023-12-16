import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";

import { GetReservationsByPreferenceIdService } from "../services/getReservationsByPreferenceId.service";
import { UpdateReservationsPaymentStatusService } from "../services/updateReservationsPaymentStatus.service";

const updateReservationsPaymentStatusService = new UpdateReservationsPaymentStatusService();
const getReservationsByPreferenceIdService = new GetReservationsByPreferenceIdService();

export default function PaymentSuccess () {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuery = async () => {
      try {
        const preferenceId = searchParams.get('preference_id');

        if (preferenceId) {
          const reservation = await getReservationsByPreferenceIdService.run(preferenceId);
          const paymentStatus = reservation.paymentStatus + 1;

          if (paymentStatus == 1 || paymentStatus == 3) {
            await updateReservationsPaymentStatusService.run(paymentStatus, reservation.id);

            setTimeout(() => navigate('/reservations-list'), 300);
          }
        }
      } catch (e) {
        console.error('err', e);
        setTimeout(() => setLoading(false), 300);
        navigate('/reservations-list');
      }

      setTimeout(() => setLoading(false), 300);
    };

    getQuery();
  }, []);

  return (
    <HomeLayout pageName='Pago exitoso'>
      {loading && ( <AppLoading /> )}
    </HomeLayout>
  );
}