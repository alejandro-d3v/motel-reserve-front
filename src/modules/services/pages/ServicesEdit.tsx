import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ServicesForm from "../components/ServicesForm";
import AppLoading from "../../../shared/components/AppLoading";

import { ServiceDto } from "../dtos/service.dto";

import { GetServiceService } from "../services/getService.service";

const getServiceService = new GetServiceService();

export default function ServicesEdit () {
  const params = useParams();

  const [service, setService] = useState<ServiceDto | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setService(await getServiceService.run(params.serviceId));
      setLoading(false);
    };
  
    getData();
  }, []);

  return (
    <>
      {loading ? ( <AppLoading /> ) : (
        <ServicesForm service={ service } />
      )}
    </>
  );
}