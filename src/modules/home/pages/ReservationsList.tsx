import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/es';

import imgTemp from '../../../../public/imgs/wallhaven-455xk8_1280x1024.png'

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { reservationWithServiceDto } from "../dtos/reservations.dto";

import { GetReservationsByCodesService } from "../services/getReservationsByCodes.service";
import { ReservationCodesService } from "../../../shared/services/reservationCodes.service";

const getReservationsByCodesService = new GetReservationsByCodesService();
const reservationCodesService = new ReservationCodesService();

dayjs.locale('es');

export default function ReservationsList () {
  const [reservations, setReservations] = useState<reservationWithServiceDto[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setReservations(await getReservationsByCodesService.run(reservationCodesService.get()));
      } catch (e) {
        console.error('err', e);
        setTimeout(() => setLoading(false), 200);
      }

      setTimeout(() => setLoading(false), 200);
    };

    loadData();
  }, []);

  const calculateTimeDifference = (startTime: string, endTime:string) => {
    const start = dayjs(`2018-04-13 ${startTime}`, 'YYYY-MM-DD HH:mm:ss');
    const end = dayjs(`2018-04-13 ${endTime}`, 'YYYY-MM-DD HH:mm:ss');

    const differenceInMinutes = end.diff(start, 'minute');
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    const differenceFormatted = dayjs().set('hour', hours).set('minute', minutes).format('H:mm');

    return differenceFormatted;
  };

  return (
    <HomeLayout pageName='Mis reservaciones'>
      {loading ? ( <AppLoading /> ) : (
        <>
          { !reservations.length ? ( <AppEmptyResponse /> ) : (
            <div className="container mx-auto mt-1 p-6 bg-white shadow-lg rounded-lg">
              {reservations.map((item) => (
                <div key={item.id} className="card card-side border rounded-lg mb-3">
                  <figure className="h-full w-56">
                    <img src={item.services.urlImg ?? imgTemp} style={{ height: '12rem' }} alt="service img"/>
                  </figure>

                  <div className="card-body p-3 justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <div className="text-neutral-400">Código: { item.code }</div>

                        <div>
                          {item.paymentStatus == 0 && ( <div className="badge bg-red-600 text-white">Pago no completado</div> )}
                          {item.paymentStatus == 1 && ( <div className="badge bg-green-600 text-white">Pago completado</div> )}
                          {item.paymentStatus == 2 && ( <div className="badge bg-red-600 text-white">Pago de cuota no completado</div> )}
                          {item.paymentStatus == 3 && ( <div className="badge bg-green-600 text-white">Pago de cuota completado</div> )}
                        </div>
                      </div>

                      <h2 className="card-title mt-3">{ item.services.name }</h2>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p><span className="font-semibold">Fecha:</span> { dayjs(item.date, 'YYYY-MM-DD').format('D MMM YYYY') }</p>
                        <p>
                          <span className="font-semibold">Hola:</span> 
                          { dayjs(`2018-04-13 ${item.startTime}`, 'YYYY-MM-DD HH:mm:ss').format(' h:mm A') } - 
                          { dayjs(`2018-04-13 ${item.endtTime}`, 'YYYY-MM-DD HH:mm:ss').format(' h:mm A ') }
                          { `(${calculateTimeDifference(item.startTime, item.endtTime)})` }
                        </p>
                      </div>

                      <div className="text-end">
                        <p><span className="">Valor de reserva:</span> <span className="font-semibold text-2xl">${ Intl.NumberFormat().format(item.totalPrice ?? 0) }</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </HomeLayout>
  );
}