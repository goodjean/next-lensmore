import axios, { AxiosResponse } from "axios";
import { NotFoundError } from "../errs/error";

function axiosAuthInterceptor<T>(response: AxiosResponse<T>): AxiosResponse {
  const status = response.status;

  if (status === 404) {
    throw new NotFoundError();
  }
  return response;
}

const withAxios = axios.create({
  baseURL: `${!typeof window ? process.env.NEXTAUTH_URL : ""}/api`,
});

withAxios.interceptors.response.use((response) => axiosAuthInterceptor(response));

export default withAxios;
