// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ICommonResponse } from "@/server/errs/erro";
import { ApiErrors, ApiInstance, CommonError, CommonResponse } from "@/server/errs/error";
import UserService from "@/server/services/userService";
import { IUserId } from "@/server/type/user";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: { status: number; message: string };
};

export default async function myPage(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userService = new UserService();
  const { name } = req.body;

  try {
    const user = await userService.getUserId(name);
    const result = { status: 200, message: user.user_id };
    res.status(200).json({ result });
  } catch (error: unknown) {
    if (error instanceof ApiInstance) {
      const result = { status: error.status, message: error.message };
      res.status(error.status).json({ result });
    } else {
      const result = { status: 500, message: "UNKNOWN ERROR발생" };
      res.status(500).json({ result });
    }
  }
}
