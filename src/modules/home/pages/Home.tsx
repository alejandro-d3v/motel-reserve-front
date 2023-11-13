import { settings } from '../../../shared/constant/settings.contants';
import banner from '../../../../public/imgs/banner.jpg';

import HomeLayout from "../layouts/HomeLayout";
import RoomCard from '../components/RoomCard';

export default function Home() {
  const rooms = [
    {
      id: 1,
      title: 'Cancha Estándar',
      description: 'Una cancha de fútbol sintética con todas las comodidades básicas.',
      price: '50.000',
      imageUrl: '/public/imgs/wallhaven-6kg3wl_1280x1024.png',
    },
    {
      id: 2,
      title: 'Cancha de Lujo',
      description: 'Una cancha de fútbol sintética espaciosa con iluminación y áreas de descanso.',
      price: '40.000',
      imageUrl: '/public/imgs/wallhaven-455xk8_1280x1024.png',
    },
    {
      id: 3,
      title: 'Cancha con Iluminación LED',
      description: 'Una cancha de fútbol sintética con iluminación LED y área de juegos.',
      price: '60.000',
      imageUrl: '/public/imgs/wallhaven-47227y_1280x1024.png',
    },
    {
      id: 4,
      title: 'Cancha para Eventos',
      description: 'Una cancha de fútbol sintética ideal para eventos y torneos.',
      price: '40.000',
      imageUrl: '/public/imgs/wallhaven-d5wk6l_1280x1024.png',
    },
  ];

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
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => <RoomCard key={room.id} {...room} /> )}
        </div>
      </section>
    </HomeLayout>
  );
}