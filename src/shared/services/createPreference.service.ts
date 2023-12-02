import { services } from "../constant/services";
import axios from "../utils/axios";

export class CreatePreferenceService {
  async run(data: any): Promise<any> {
    return await axios.post<any>(`${services.api}/payments/create-order`, data).then(response => response.data);
  }
}