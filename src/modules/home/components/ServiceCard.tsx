import { Link } from 'react-router-dom';

import imgTemp from '../../../../public/imgs/wallhaven-455xk8_1280x1024.png'

import { ServiceDto } from '../../services/dtos/service.dto';

export default function ServiceCard (service: ServiceDto) {
  return (
    <Link to={`/service/${service.id}`} className="text-decoration-none">
      <div className="bg-white rounded-lg shadow-lg cursor-pointer h-full">
        <img src={service.urlImg ?? imgTemp} alt={service.name} className="w-full h-40 object-cover mb-4" />

        <div className="px-4 pb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>

            <p className="text-gray-600 mb-5 h-11">{service.description}</p>
          </div>

          <p className="text-primary font-semibold text-right">${Intl.NumberFormat().format(service.price ?? 0)} por hora</p>
        </div>
      </div>
    </Link>
  );
};