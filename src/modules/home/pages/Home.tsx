import { settings } from '../../../shared/constant/settings.contants';
import homeDefault from '../../../../public/imgs/home-default.jpg';

import HomeLayout from "../layouts/HomeLayout";
import RoomCard from '../components/RoomCard';

export default function Home() {
  const rooms = [
    {
      id: 1,
      title: 'Habitación Estándar',
      description: 'Una habitación cómoda con todas las comodidades básicas.',
      price: '50.000',
      imageUrl: 'https://static.motelnowapp.com/co/images/motel/10084.jpg',
    },
    {
      id: 2,
      title: 'Suite de Lujo',
      description: 'Una suite espaciosa con vistas panorámicas al mar.',
      price: '40.000',
      imageUrl: 'https://static.motelnowapp.com/co/images/motel/10062.jpg',
    },
    {
      id: 3,
      title: 'Habitación con Jacuzzi',
      description: 'Una suite espaciosa con vistas panorámicas al mar.',
      price: '60.000',
      imageUrl: 'https://static.motelnowapp.com/co/images/motel/20086_216_2.jpg',
    },
    {
      id: 4,
      title: 'Suite Romántica',
      description: 'Una suite espaciosa con vistas panorámicas al mar.',
      price: '40.000',
      imageUrl: 'https://static.motelnowapp.com/co/images/motel/10084_513_1.jpg',
    },
  ];

  return (
    <HomeLayout>
      <section className="relative h-screen max-h-96">
        <div className="absolute inset-0 bg-cover bg-center filter brightness-50" style={{ backgroundImage: `url(${homeDefault})`, maxHeight: '25rem' }}></div>

        <div className="h-full flex flex-col justify-center items-center relative z-10">
          <h1 className="text-7xl text-white font-semibold mb-4">{settings.appName}</h1>
          <p className="text-4x1 text-white">Reserva en nuestro motel y disfruta de tu estancia</p>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => <RoomCard {...room} /> )}
        </div>
      </section>
    </HomeLayout>
  );
}