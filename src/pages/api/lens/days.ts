import LensService from "@/server/services/lensService";
import { IDays } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IDays[];
};

export default async function days(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();

  const result = await lensService.getLensDayList();
  res.status(200).json({ result });
}
