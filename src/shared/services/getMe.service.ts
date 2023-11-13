import { services } from "../constant/services";
import axios from "../utils/axios";

import { MeDto } from "../dto/user.dto";

export class GetMeService {
  async run(): Promise<any> {
    return await axios.post<MeDto>(`${services.api}/users/me`).then(response => response.data);
  }
}