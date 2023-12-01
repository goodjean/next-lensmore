import axios, { AxiosResponse } from "axios";

// function axiosAuthInterceptor<T>(response: AxiosResponse<T>): T {
//   return response.data;
// }

// const withAxios = axios.create({
//   baseURL: `${!typeof window ? process.env.NEXTAUTH_URL : ""}/api`,
// });

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

// withAxios.interceptors.response.use((response) => axiosAuthInterceptor(response));

// export default withAxios;
export default instance;
