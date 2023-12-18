import { useEffect, useState } from 'react';

import { settings } from '../../../shared/constant/settings.contants';

import banner from '../../../../public/imgs/banner.jpg';

import HomeLayout from "../layouts/HomeLayout";

import ServiceCard from '../components/ServiceCard';
import AppLoading from '../../../shared/components/AppLoading';

import { ServiceDto } from '../../services/dtos/service.dto';

import { GetServicesService } from '../../services/services/getServices.service';

const getServicesService = new GetServicesService();

export default function Home() {
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      setLoading(true);

      try {
        const res = await getServicesService.run();
        setServices(res.filter(item => item.status == 1));

        console.log('services', services);
      } catch (e) {
        console.error('err:', e);
        setLoading(false);
      }

      setTimeout(() => setLoading(false), 300);
    };

    getServices();
  }, []);

  return (
    <HomeLayout>
      <section className="relative h-screen max-h-96">
        <div className="absolute inset-0 bg-cover bg-center filter brightness-50" style={{ backgroundImage: `url(${banner})`, maxHeight: '30rem' }}></div>

        <div className="h-full flex flex-col justify-center items-center relative z-[1]">
          <h1 className="text-7xl text-white font-semibold mb-4 leading-7">{settings.appName}</h1>
          <p className="text-4x1 text-white">¡Reserva tu espacio, juega sin preocupaciones!</p>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
      {loading ? ( <AppLoading /> ) : (
        <>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => <ServiceCard key={service.id} { ...service } /> )}
          </div>
        </>
      )}
      </section>
    </HomeLayout>
  );
}