import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/es';

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

// import { ReservationDto } from "../../home/dtos/reservations.dto";
import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

dayjs.locale('es');

export default function ReportReservation () {
  const [report, setReport] = useState<any[]>([]);
  const [reportFiltered, setReportFiltered] = useState<any[]>([]);
  const [services, setServices] = useState<ServiceWithReservationsDto[] | []>([]);

  const [dateSince, setDateSince] = useState<string>('');
  const [dateUntil, setDateUntil] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedServices = await getServicesWithReservationsService.run({});
        setServices(fetchedServices);
      } catch (e) {
        console.error('err:', e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const newArray = services.map(item => {
      const serviceName = item.name;
      return item.reservation.map(reservation => ({ ...reservation, serviceName }));
    }).flat();

    setReport(newArray);
    setReportFiltered(report);

    setTimeout(() => setLoading(false), 400);
  }, [services]);

  const filterData = () => {
    if (!dateSince && !dateUntil && !serviceId) setReportFiltered(report);

    if (serviceId) {
      let filteredReservations = report.filter(item => item.serviceId == serviceId);

      if (dateSince && dateUntil) {
        const startDate = dayjs(`${dateSince}T00:00:00`);
        const endDate = dayjs(`${dateUntil}T23:59:59`);

        filteredReservations = filteredReservations.filter(item => {
          const reservationDate = dayjs(item.date + "T" + item.startTime);
  
          return isDateInRange(reservationDate, startDate, endDate);
        });
      }

      setReportFiltered(filteredReservations);
    }

    if (!serviceId && dateSince && dateUntil) {
      const startDate = dayjs(`${dateSince}T00:00:00`);
      const endDate = dayjs(`${dateUntil}T23:59:59`);

      const filteredReservations = report.filter(item => {
        const reservationDate = dayjs(item.date + "T" + item.startTime);

        return isDateInRange(reservationDate, startDate, endDate);
      });

      setReportFiltered(filteredReservations);
    }
  };

  const isDateInRange = (date: dayjs.Dayjs, startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
    return date.isAfter(startDate) && date.isBefore(endDate);
  };

  return (
    <>
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">Reporte de reservas</h1>

          <Link to="/admin/reports">
            <button className="btn btn-outline">Volver</button>
          </Link>
        </div>

        <div className="flex space-x-4 items-end mt-5">
          <div className="form-control w-56 min-w-56">
            <label className="label">
              <span className="label-text">Desde:</span>
            </label>

            <input type="date" className="input input-bordered w-full" value={ dateSince } onChange={(e) => setDateSince(e.target.value)} />
          </div>

          <div className="form-control w-56 min-w-56">
            <label className="label">
              <span className="label-text">Hasta</span>
            </label>

            <input type="date" className="input input-bordered w-full" value={ dateUntil } onChange={(e) => setDateUntil(e.target.value)} />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Servicio</span>
            </label>

            <select className="select select-bordered" value={serviceId} onChange={(e: any) => setServiceId(e.target.value)}>
              <option value=""></option>
              { services.map(item => <option key={item.id} value={item.id}>{item.name}</option>) }
            </select>
          </div>

          <button className="btn btn-neutral" onClick={ filterData }>Filtrar</button>
        </div>

        <div className="divider"></div>

        <table className="table">
          <thead>
            <tr>
              <th className="p-3 font-semibold text-left w-28">Código</th>
              <th className="p-3 font-semibold text-left">Cliente</th>
              <th className="p-3 font-semibold text-left">Servicio</th>
              <th className="p-3 font-semibold text-center w-28">Fecha</th>
              <th className="p-3 font-semibold text-center w-36">Hora reserva</th>
              <th className="p-3 font-semibold text-right w-28">Valor de reserva</th>
              <th className="p-3 font-semibold text-center w-60">Estado</th>
            </tr>
          </thead>

          <tbody>
            {loading ? ( <tr><td colSpan={7}><AppLoading /></td></tr> ) : (
              <>
                { !reportFiltered.length ? ( <tr><td colSpan={7}><AppEmptyResponse /></td></tr> ) : (
                  <>
                    {reportFiltered.map((item) => (
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

                        <td className="p-3">{item.serviceName}</td>

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
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}