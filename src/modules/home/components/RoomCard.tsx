export default function RoomCard({ title, description, price, imageUrl }: any) {
  return (
    <div className="bg-white rounded-lg shadow-lg cursor-pointer">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4" />

      <div className="px-4 pb-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-primary font-semibold text-right">${price} por 3 horas</p>
      </div>
    </div>
  );
};