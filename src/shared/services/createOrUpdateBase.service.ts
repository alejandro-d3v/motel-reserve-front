import axios from '../utils/axios';

import { JsonToFormDataService } from './jsonToFormData.service';

const jsonToFormDataService = new JsonToFormDataService();

export class CreateOrUpdateBaseService<ICreateOrUpdateContentService> {
  url = '';
  isFormData = false;
  params = {};

  async run(data: ICreateOrUpdateContentService, id?: number): Promise<any> {
    let newData: any = data;

    if (this.isFormData) newData = jsonToFormDataService.run(data);

    if (id !== null && id !== undefined) return await this.update(newData, id);
    else return await this.create(newData);
  }

  private async create(data: any): Promise<any> {
    return axios.post(this.url, data, { params: this.params }).then(response => response.data);
  }

  private async update(data: any, id: number): Promise<any> {
    return axios.put(this.url + '/' + id, data, { params: this.params }).then(response => response.data);
  }
}