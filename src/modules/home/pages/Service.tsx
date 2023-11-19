import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import imgTemp from '../../../../public/imgs/wallhaven-455xk8_1280x1024.png'

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { ServiceDto } from "../../services/dtos/service.dto";

import { GetServiceService } from "../../services/services/getService.service";

const getServiceService = new GetServiceService();

export default function Service () {
  const params = useParams();

  const [service, setService] = useState<ServiceDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getService = async () => {
      try {
        setService(await getServiceService.run(params.serviceId));
      } catch (e) {
        console.error('err', e);
        setTimeout(() => setLoading(false), 300);
      }

      setTimeout(() => setLoading(false), 300);
    };

    getService();
  }, []);

  return (
    <HomeLayout pageName='Service'>
      {loading ? ( <AppLoading /> ) : (
        <>
          { !service ? ( <AppEmptyResponse /> ) : (
            <div className="container mx-auto mt-1 p-6 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="room-info md:w-1/2">
                  <h1 className="text-2xl font-semibold mb-4">{service.name}</h1>

                  <img src={service.urlImg ?? imgTemp} alt={service.name} className="mb-4 rounded-lg" />

                  <p><strong>Descripción:</strong> {service.description}</p>
                  <p><strong>Precio:</strong> ${Intl.NumberFormat().format(service.price ?? 0)} por hora</p>
                </div>

                <div className="room-description md:w-1/2 mt-4 md:mt-0">
                  <h2 className="text-xl font-semibold mb-2">Más detalles</h2>
                  <p className="text-gray-700">{service.longDescription}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </HomeLayout>
  );
}