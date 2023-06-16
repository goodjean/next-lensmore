import LensService from "@/server/services/lensService";
import { IBestLensItem, IBrands } from "@/server/type/lens";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: number;
};

export default async function getLenslistByPeriod(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();
  const { period } = req.query;
  const periodStr = String(period);

  const result = await lensService.getLenslistByPeriod(periodStr);
  res.status(200).json({ result });
}
