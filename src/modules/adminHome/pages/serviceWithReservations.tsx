import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/es';

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

dayjs.locale('es');

export default function serviceWithReservations () {
  const params = useParams();

  const [service, setService] = useState<ServiceWithReservationsDto | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const serviceId = params.serviceId;

        setService(await getServicesWithReservationsService.run({ serviceId }))
      } catch (e) {
        console.error('err:', e);
        setLoading(false);
      }

      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      <div className="px-8 pt-4">
        {loading ? ( <AppLoading /> ) : (
          <>
            {service && (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-semibold mb-0">{ service.name }</h1>

                  <div className="flex gap-2">
                    <Link to="/admin/home">
                      <button className="btn btn-outline">Volver</button>
                    </Link>

                    <button className="btn btn-active btn-neutral">Agregar</button>
                  </div>
                </div>

                <div className="divider"></div>

                <table className="table">
                  <thead>
                    <tr>
                      <th className="p-3 font-semibold text-left w-28">Código</th>
                      <th className="p-3 font-semibold text-left">Cliente</th>
                      <th className="p-3 font-semibold text-center w-28">Fecha</th>
                      <th className="p-3 font-semibold text-center w-36">Hora reserva</th>
                      <th className="p-3 font-semibold text-right w-28">Valor de reserva</th>
                      <th className="p-3 font-semibold text-center w-60">Estado</th>
                      <th className="p-3 font-semibold text-center w-32">Opciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    { !service.reservation.length ? ( <tr><td colSpan={7}><AppEmptyResponse /></td></tr> ) : (
                      <>
                        {service.reservation.map((item) => (
                          <tr key={item.id}>
                            <td className="p-3">{item.code}</td>

                            <td className="p-3">
                              <div className="flex items-center space-x-3">
                                <div>
                                  <div className="font-semibold">{item.nameClient}</div>
                                  <div className="text-sm opacity-50">{item.phone}</div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3 text-center">{ dayjs(item.date, 'YYYY-MM-DD').format('D MMM YYYY') }</td>
                            <td className="p-3 text-center">
                              { dayjs(`2018-04-13 ${item.startTime}`, 'YYYY-MM-DD HH:mm:ss').format(' h:mm A') } - 
                              { dayjs(`2018-04-13 ${item.endtTime}`, 'YYYY-MM-DD HH:mm:ss').format(' h:mm A ') }
                            </td>
                            <td className="p-3 text-right">${ Intl.NumberFormat().format(item.totalPrice ?? 0) }</td>

                            <td className="p-3 text-center">
                              {item.paymentStatus == 0 && ( <div className="badge bg-red-600 text-white">Pago no completado</div> )}
                              {item.paymentStatus == 1 && ( <div className="badge bg-green-600 text-white">Pago completado</div> )}
                              {item.paymentStatus == 2 && ( <div className="badge bg-red-600 text-white">Pago de cuota no completado</div> )}
                              {item.paymentStatus == 3 && ( <div className="badge bg-green-600 text-white">Pago de cuota completado</div> )}
                            </td>

                            <td>
                              <div className="flex justify-center">
                                <button className="btn btn-sm join-item btn-outline btn-neutral">Editar</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}

        {/* {loading ? ( <AppLoading /> ) : (
          <>
            { !roles.length ? ( <AppEmptyResponse /> ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((item) => (
                  <div key={item.id} className="card card-compact bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>

                      <p>{item.description}</p>

                      <div className="card-actions justify-end">
                        <div className="join">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )} */}
      </div>
    </>
  );
}