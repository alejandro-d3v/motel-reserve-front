import { useState } from "react";

export default function AdminHome() {
  const [services] = useState([
    {
      id: 1,
      name: 'Cancha de Microfútbol',
      description: 'Cancha de microfútbol para alquiler',
      longDescription:
        'Esta cancha de microfútbol está equipada con todas las comodidades para disfrutar de tus partidos. Nuestro campo de microfútbol es ideal para partidos amistosos y competencias. ¡Resérvalo ahora!',
      price: 20.00,
      advancePayment: 5.00,
      status: 'Disponible',
      createdAt: '2023-10-26 10:00:00',
      updatedAt: '2023-10-26 10:00:00',
    },
    {
      id: 2,
      name: 'Cancha de Vóley Playa',
      description: 'Cancha de vóley playa para alquiler',
      longDescription:
        'Disfruta de un día soleado en nuestra cancha de vóley playa. Perfecta para divertirse en la playa con amigos y familiares. ¡Ven y juega!',
      price: 15.00,
      advancePayment: 4.00,
      status: 'Reservada',
      createdAt: '2023-10-26 10:15:00',
      updatedAt: '2023-10-26 10:15:00',
    },
    {
      id: 3,
      name: 'Piscina Olímpica',
      description: 'Piscina olímpica para natación',
      longDescription:
        'Nuestra piscina olímpica es ideal para entrenamientos y competencias de natación. Dispone de carriles para nadadores de todas las edades. ¡Ven a nadar en un entorno olímpico!',
      price: 25.00,
      advancePayment: 6.00,
      status: 'Mantenimiento',
      createdAt: '2023-10-26 10:30:00',
      updatedAt: '2023-10-26 10:30:00',
    },
    {
      id: 4,
      name: 'Campo de Tenis',
      description: 'Cancha de tenis para alquiler',
      longDescription:
        'Nuestra cancha de tenis está disponible para partidos individuales y dobles. Cuenta con superficie de alta calidad y luces para partidos nocturnos. ¡Reserva tu hora de juego!',
      price: 18.00,
      advancePayment: 4.50,
      status: 'Disponible',
      createdAt: '2023-10-26 10:45:00',
      updatedAt: '2023-10-26 10:45:00',
    },
    {
      id: 5,
      name: 'Piscina de Olas',
      description: 'Piscina de olas para diversión acuática',
      longDescription:
        'Disfruta de las olas en nuestra piscina de olas artificiales. Perfecta para la diversión acuática y el surf de piscina. ¡Ven y surfea con nosotros!',
      price: 30.00,
      advancePayment: 7.50,
      status: 'Disponible',
      createdAt: '2023-10-26 11:00:00',
      updatedAt: '2023-10-26 11:00:00',
    },
    {
      id: 6,
      name: 'Cancha de Baloncesto',
      description: 'Cancha de baloncesto para partidos amistosos',
      longDescription:
        'Ven y juega al baloncesto en nuestra cancha de alta calidad. Ideal para partidos amistosos y competencias. ¡Reserva tu cancha ahora y muestra tus habilidades!',
      price: 17.00,
      advancePayment: 4.25,
      status: 'Mantenimiento',
      createdAt: '2023-10-26 11:15:00',
      updatedAt: '2023-10-26 11:15:00',
    },
  ]);

  return (
    <>
      <div className="px-8 pt-4">
        <h1 className="text-3xl font-semibold mb-4">Servicios</h1>

        <div className="grid grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="card card-compact bg-base-100 shadow-xl">
              <figure><img src="/public/imgs/banner.jpg" alt="img" /></figure>

              <div className="card-body">
                <div className="flex justify-end">
                  <div 
                    className={`badge badge-neutral`}
                  >
                    {service.status}
                  </div>
                </div>

                <h2 className="card-title">{service.name}</h2>

                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}