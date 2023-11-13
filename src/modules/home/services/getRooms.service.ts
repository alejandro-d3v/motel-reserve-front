export class GetRoomsService {
    async run() {
      const rooms = [
        {
          id: 1,
          title: 'Cancha Estándar',
          description: 'Una cancha de fútbol sintética con todas las comodidades básicas.',
          price: '50.000',
          imageUrl: 'https://scontent.fpso1-1.fna.fbcdn.net/v/t39.30808-6/378830593_1033071517720706_6102163099415534975_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGOqkVo_T8rXZqvJHIqtecLxe3_1xcUUrrF7f_XFxRSuin5iB6xjTjOAcW0Sc8GhyaSdSDcgYzs3WGg1j7255ht&_nc_ohc=0za52eu33XYAX-SQlLr&_nc_ht=scontent.fpso1-1.fna&oh=00_AfDokdl1RW115BfEwFunkn7twpa2KG_lP4bH29f2AlNG4w&oe=65371F20',
        },
        {
          id: 2,
          title: 'Cancha de Lujo',
          description: 'Una cancha de fútbol sintética espaciosa con iluminación y áreas de descanso.',
          price: '40.000',
          imageUrl: 'https://scontent.fpso1-1.fna.fbcdn.net/v/t39.30808-6/378813461_1033071737720684_6396414007319270644_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF5tL7b8thqZahnlvT0250T2XvNJ3P6_3zZe80nc_r_fI1cqFduFso84X9NBIsZJeYG37psupRS_-5tW6VSKd4o&_nc_ohc=7pAwkkHU2yIAX_ZcjiY&_nc_ht=scontent.fpso1-1.fna&oh=00_AfAgo21HJYX9tVsZMWwtxi-OXRU1WxjUtlkXUnUtEg7nHg&oe=65379B8C',
        },
        {
          id: 3,
          title: 'Cancha con Iluminación LED',
          description: 'Una cancha de fútbol sintética con iluminación LED y área de juegos.',
          price: '60.000',
          imageUrl: 'https://scontent.fpso1-1.fna.fbcdn.net/v/t39.30808-6/318214588_876414240053102_1616934476054167858_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHRvxrDfQngvOfYdxtOqGvkTBS0k0ixliNMFLSTSLGWIwiwJmLBhVOFMlWGgMtPD0l37pyisT4lqo32VYdRyLsO&_nc_ohc=28uexPbDrtkAX9emx7W&_nc_ht=scontent.fpso1-1.fna&oh=00_AfCKkc_-k2R6tFIHI3e4w3sDc22Qw6ll7DLmV8Cpt1csUQ&oe=6538B46E',
        },
        {
          id: 4,
          title: 'Cancha para Eventos',
          description: 'Una cancha de fútbol sintética ideal para eventos y torneos.',
          price: '40.000',
          imageUrl: 'https://scontent.fpso1-1.fna.fbcdn.net/v/t39.30808-6/281335184_747156192978908_6692132815115483395_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGHylPGpcGr5gbKcvIZ26EAHKu-NrUt8nscq742tS3ye_PdjChMNtDtC1skbh9Xmkh0G9vk6iC2fm5T6j7ZOaN5&_nc_ohc=maKdWSfEdA4AX9_n_2f&_nc_ht=scontent.fpso1-1.fna&oh=00_AfCZb2e_p8_10mLcZlpFrwC6ESBUSB5KI8MjkThVkeYLKQ&oe=65386325',
        },
      ];
  
      return rooms;
    }
  }