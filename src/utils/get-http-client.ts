import axios from 'axios';
import cookie from 'js-cookie';

export const getHttpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  client.interceptors.response.use(response => response.data);

  client.interceptors.response.use(
    response => response,
    error => {
      const status = error.response?.status;

      if (status && status === 498) {
        const { errorCode } = error.response.data;

        cookie.remove('token');
        cookie.remove('token_expiration_date');

        window.location.reload();

        return Promise.reject({ ...error, code: errorCode });
      }

      return Promise.reject(error);
    }
  );

  return client;
};
