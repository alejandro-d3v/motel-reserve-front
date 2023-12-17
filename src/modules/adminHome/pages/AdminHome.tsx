import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import imgTemp from '../../../../public/imgs/wallhaven-455xk8_1280x1024.png';

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

export default function AdminHome() {
  const [services, setServices] = useState<ServiceWithReservationsDto[] | []>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        setServices(await getServicesWithReservationsService.run({}));
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
            { !services.length ? ( <AppEmptyResponse /> ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((item) => (
                  <Link to={`service-with-reservations/${item.id}`}>
                    <div key={item.id} className="card card-compact bg-base-100 shadow-xl">
                      <figure><img src={item.urlImg ?? imgTemp} style={{ height: '15rem', width: '100%' }} alt="img service" /></figure>

                      <div className="card-body">
                        <div className="flex justify-between">
                          <div className={`badge badge-neutral`}>{`${item.reservation.length} reservaciones`}</div>

                          <div className={`badge badge-neutral`}>{item.status ? 'Disponible' : 'No disponible'}</div>
                        </div>

                        <h2 className="card-title">{item.name}</h2>

                        <p>{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}