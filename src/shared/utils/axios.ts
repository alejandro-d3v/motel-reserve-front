import axios, { AxiosRequestHeaders } from 'axios';

import { TokenService } from '../services/token.service';
import { ToastService } from '../services/toast.service';

const toastService = new ToastService();
const getTokenService = new TokenService();

axios.interceptors.request.use(async (config) => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;

  const token = await getTokenService.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  toastService.hide();
  
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.message) {
      toastService.show(response.data.message);
    }

    return response;
  }, (error) => {
    const response = error.response;

    if (response && response.data) {
      const data = response.data;

      if (data.message || (data.detail && typeof data.detail === 'string')) {
        toastService.show(data.message ?? data.detail, 'error');
      }
    }

    return Promise.reject(error);
  }
)

export default axios;