import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

// import { ReservationDto } from "../../home/dtos/reservations.dto";
import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

export default function ReportByDate () {
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
    setReport(services);

    setTimeout(() => setLoading(false), 400);
  }, [services]);

  return (
    <>
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">Reporte por fecha</h1>

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
            {loading ? ( <tr><td colSpan={5}><AppLoading /></td></tr> ) : (
              <>
                { !report.length ? ( <tr><td colSpan={5}><AppEmptyResponse /></td></tr> ) : (
                  <>
                    {report.map((item) => (
                      <tr key={item.id}>

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