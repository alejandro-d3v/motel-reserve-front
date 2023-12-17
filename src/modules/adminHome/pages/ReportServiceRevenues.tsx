import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { ReservationDto } from "../../home/dtos/reservations.dto";
import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

export default function ReportServiceRevenues () {
  const [report, setReport] = useState<ServiceWithReservationsDto[]>([]);
  const [services, setServices] = useState<ServiceWithReservationsDto[] | []>([]);

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
    // const newArray: any = [];

    setReport(services);

    setTimeout(() => setLoading(false), 400);
  }, [services]);

  const calculateIncome = (reservationData: ReservationDto[]) => {
    const filteredReservations = reservationData.filter(reservation => reservation.paymentStatus === 1 || reservation.paymentStatus === 3);
    const totalPriceSum = filteredReservations.reduce((total, reservation) => total + reservation.totalPrice, 0);
  
    return totalPriceSum ?? 0;
  };
  const calculateUnfinishedPayments = (reservationData: ReservationDto[]) => {
    const filteredReservations = reservationData.filter(reservation => reservation.paymentStatus === 0 || reservation.paymentStatus === 2);
    const totalPriceSum = filteredReservations.reduce((total, reservation) => total + reservation.totalPrice, 0);
  
    return totalPriceSum ?? 0;
  };

  return (
    <>
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">Reporte de ingresos por servicio</h1>

          <Link to="/admin/reports">
            <button className="btn btn-outline">Volver</button>
          </Link>
        </div>

        <div className="divider"></div>

        <table className="table">
          <thead>
            <tr>
              <td>Nombre</td>
              <td className="text-center">Estado</td>
              <td className="text-end">Precio por hora</td>
              <td className="text-end">Cuota minima</td>
              <td className="text-end">Pagos no finalizados</td>
              <td className="text-end">Ingresos</td>
            </tr>
          </thead>

          <tbody>
            {loading ? ( <tr><td colSpan={4}><AppLoading /></td></tr> ) : (
              <>
                { !report.length ? ( <tr><td colSpan={4}><AppEmptyResponse /></td></tr> ) : (
                  <>
                    {report.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        
                        <td className="p-3 text-center">
                          {item.status == 0 && ( <div className="badge bg-red-600 text-white">No Disponible</div> )}
                          {item.status == 1 && ( <div className="badge bg-green-600 text-white">Disponible</div> )}
                        </td>

                        <td className="text-end">${ Intl.NumberFormat().format(item.price ?? 0) }</td>
                        <td className="text-end">${ Intl.NumberFormat().format(item.advancePayment ?? 0) }</td>

                        <td className="text-end">${ Intl.NumberFormat().format(calculateUnfinishedPayments(item.reservation) ?? 0) }</td>
                        <td className="text-end">${ Intl.NumberFormat().format(calculateIncome(item.reservation) ?? 0) }</td>
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