export interface ICommonError {
  type: string;
  message: string;
}

export interface ICommonResponse {
  data: T?;
  error: ICommonError?;
}
