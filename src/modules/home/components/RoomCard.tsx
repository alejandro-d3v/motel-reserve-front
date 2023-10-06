import { Link } from 'react-router-dom';

export default function RoomCard(data: any) {
  return (
    <Link to={`/room/${data.id}`} className="text-decoration-none">
      <div className="bg-white rounded-lg shadow-lg cursor-pointer">
        <img src={data.imageUrl} alt={data.title} className="w-full h-40 object-cover mb-4" />

        <div className="px-4 pb-4">
          <h2 className="text-xl font-semibold mb-2">{data.title}</h2>

          <p className="text-gray-600 mb-2">{data.description}</p>
          <p className="text-primary font-semibold text-right">${data.price} por 3 horas</p>
        </div>
      </div>
    </Link>
  );
};