import axios, { AxiosResponse } from "axios";

function axiosAuthInterceptor<T>(response: AxiosResponse<T>): T {
  return response.data;
}

const withAxios = axios.create({
  baseURL: `${!typeof window ? process.env.NEXTAUTH_URL : ""}/api`,
});

withAxios.interceptors.response.use((response) => axiosAuthInterceptor(response));

export default withAxios;

// const status = response.status;

// if (status === 404) {
//   throw new NotFoundError();
// }
