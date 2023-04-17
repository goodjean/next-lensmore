import { ICommonError } from "./erro";

export class CommonError extends Error {
  status: number;
  type: string;
  message: string;
  constructor(status: number, type: string, message: string) {
    super(message);
    this.status = status;
    this.type = type;
    this.message = message;
  }
}

export class CommonResponse<T> {
  data: T | null;
  error: ICommonError | null;
  constructor(data: T | null, error: ICommonError | null) {
    this.data = data;
    this.error = error;
  }
}

export function isInstanceOfApiError(object: unknown): object is ApiErrors {
  return object instanceof ApiErrors && "redirectUrl" in object;
}

export class ApiInstance extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class ApiErrors extends Error {
  status = 400;
  message = "";
}

export class NotFoundError extends ApiErrors {
  status = 404;
  message = "not found error 발생";
}

export class ForbiddenError extends ApiErrors {
  name = "ForbiddenError";
  message = "인증처리에 실패했습니다";
  redirectUrl = "/error";
}
