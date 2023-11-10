import LensService from "@/server/services/lensService";
import { ILensDetail } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: ILensDetail | undefined;
};

export default async function getLensDetailById(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();
  const { id } = req.query;
  const idToNum = Number(id);

  const result = await lensService.getLensDetailById(idToNum);
  res.status(200).json({ result });
}
