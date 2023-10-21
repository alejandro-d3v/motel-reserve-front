import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeLayout from "../layouts/HomeLayout";

import { GetRoomByIdService } from "../services/getRoomById.service";

const getRoomByIdService = new GetRoomByIdService();

export default function Room() {
  const params = useParams(); 

  const [room, setRoom] = useState<any>({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await getRoomByIdService.run(params.roomId);

        setRoom(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    getRoom();
  }, []);

  return (
    <HomeLayout pageName='Room'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto mt-1 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="room-info md:w-1/2">
              <h1 className="text-2xl font-semibold mb-4">{room.title}</h1>
              <img src={room.imageUrl} alt="Habitación Estándar" className="mb-4 rounded-lg" />
              <p><strong>Descripción:</strong> {room.description}</p>
              <p><strong>Precio:</strong> {room.price}</p>
            </div>

            <div className="room-description md:w-1/2 mt-4 md:mt-0">
              <h2 className="text-xl font-semibold mb-2">Más detalles sobre la cancha deportiva:</h2>
              <p className="text-gray-700">
                Esta cancha deportiva está equipada con todo lo que necesitas para una experiencia cómoda y emocionante.
                Incluye comodidades esenciales para que disfrutes al máximo de tus actividades deportivas y recreativas.
              </p>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}