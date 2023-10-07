import { GetRoomsService } from "./getRooms.service";

const getRoomsService = new GetRoomsService();

export class GetRoomByIdService {
  async run(roomId: any) {
    const rooms = await getRoomsService.run();

    const room = rooms.find((item) => item.id == roomId);

    return room ? room : 'No se encontró ningún registro con ese ID';
  }
}