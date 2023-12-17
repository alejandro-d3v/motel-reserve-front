import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";

import { GetReservationsByCodesService } from "../services/getReservationsByCodes.service";
import { ReservationCodesService } from "../../../shared/services/reservationCodes.service";
import { GetReservationsByPreferenceIdService } from "../services/getReservationsByPreferenceId.service";
import { UpdateReservationsPaymentStatusService } from "../services/updateReservationsPaymentStatus.service";

const updateReservationsPaymentStatusService = new UpdateReservationsPaymentStatusService();
const getReservationsByPreferenceIdService = new GetReservationsByPreferenceIdService();
const getReservationsByCodesService = new GetReservationsByCodesService();
const reservationCodesService = new ReservationCodesService();

export default function PaymentSuccess () {
  const [ searchParams ] = useSearchParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuery = async () => {
      try {
        let preferenceId = searchParams.get('preference_id');
        const reservationCodes = reservationCodesService.get();
        const lastCode = reservationCodes[reservationCodes.length - 1];

        if (!preferenceId) {
          const reservation = await getReservationsByCodesService.run([lastCode]);
          preferenceId = reservation[0].preferenceId;
        }

        if (preferenceId) {
          const reservation = await getReservationsByPreferenceIdService.run(preferenceId);
          const paymentStatus = reservation.paymentStatus + 1;

          if (paymentStatus == 1 || paymentStatus == 3) {
            await updateReservationsPaymentStatusService.run(paymentStatus, reservation.id);
          }
        }
      } catch (e) {
        console.error('err', e);
        setTimeout(() => setLoading(false), 300);
      }

      setTimeout(() => setLoading(false), 300);
    };

    getQuery();
  }, []);

  return (
    <HomeLayout pageName='Pago exitoso'>
      {loading ? ( <AppLoading /> ) : (
        <div className="items-center shadow-lg w-2/5 mx-auto mt-6 p-4">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold">Pago realizado</h2>

            <div className="divider"></div> 
            
            <div style={{ width: '20rem', height: '20rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#28A128">
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
              </svg>
            </div>

            <Link to={`/reservations-list`}>
              <button className="btn btn-neutral mt-3">Ver mis reservaciones</button>
            </Link>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}