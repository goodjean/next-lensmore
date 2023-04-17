import { ICommonResponse } from "@/server/errs/erro";
import { CommonError, CommonResponse } from "@/server/errs/error";
import UserService from "@/server/services/userService";
import { ILoginResponse } from "@/server/type/user";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: ICommonResponse;
};

export default async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userService = new UserService();
  const { id, pw } = req.body;

  try {
    const loginRes = await userService.login(id, pw);
    const result = new CommonResponse<ILoginResponse>(loginRes, null);
    res.status(200).json({ result });
  } catch (error: unknown) {
    if (error instanceof CommonError) {
      const result = new CommonResponse<null>(null, { type: error.type, message: error.message });
      res.json({ result });
    } else {
      const result = new CommonResponse<null>(null, { type: "UNKNOWN_EXCEPTION", message: "알 수 없는 에러입니다" });
      res.json({ result });
    }
  }
}
