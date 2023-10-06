export class GetRoomsService {
    async run() {
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
  
      return rooms;
    }
  }