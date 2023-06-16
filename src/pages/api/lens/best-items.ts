import LensService from "@/server/services/lensService";
import { IBestLensItem } from "@/types/lens/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IBestLensItem[];
};

export default async function getBestLensByPeriodAndBrand(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();
  const { period, brandId } = req.query;
  const periodStr = String(period);
  const brandIdNum = Number(brandId);

  const result = await lensService.getLenslistByPeriodAndBrand(periodStr, brandIdNum);
  res.status(200).json({ result });
}
