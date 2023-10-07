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
        <div className="container">
        <div className="room-info">
          <h1>{room.title}</h1>
          <img src="https://static.motelnowapp.com/co/images/motel/10084.jpg" alt="Habitación Estándar" />
          <p><strong>Descripción:</strong> {room.description} </p>
          <p><strong>Precio:</strong> {room.price} </p>
        </div>

        <div className="room-description">
          <h2>Más detalles sobre la habitación:</h2>
          <p>Esta habitación está equipada con todo lo que necesitas para una estancia cómoda. Incluye comodidades básicas para que te sientas como en casa durante tu viaje.</p>
        </div>
    </div>
      )}
    </HomeLayout>
  );
}
