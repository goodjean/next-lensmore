// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ICommonResponse } from "@/server/errs/erro";
import { CommonError, CommonResponse } from "@/server/errs/error";
import UserService from "@/server/services/userService";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: ICommonResponse;
};

export default async function signup(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userService = new UserService();
  const { id, pw, name } = req.body;
  // try {
  // res.status(200).json({ result });
  // } catch(e: ApiError) {
  //   res.status(e.status).json( CommonResponse)(null, {code: e.type, msg: "유저 정보를 찾을 수 없습니다."}))
  // }

  try {
    const registerRes = await userService.registerUser(id, pw, name);
    const result = new CommonResponse<boolean>(registerRes, null);
    res.status(200).json({ result });
  } catch (error: unknown) {
    if (error instanceof CommonError) {
      const result = new CommonResponse<null>(null, { type: error.type, message: error.message });
      res.status(error.status).json({ result });
    } else {
      const result = new CommonResponse<null>(null, { type: "UNKNOWN_EXCEPTION", message: "알 수 없는 에러입니다" });
      res.status(500).json({ result });
    }
  }

  // try {
  //   const result = await userService.registerUser(id, pw, name);
  //   res.status(200).json({ message: result });
  //   console.log(typeof result);
  // } catch (e) {
  //   res.status(422).json({ message: e });
  // }
}
