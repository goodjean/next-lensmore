import LensService from "@/server/services/lensService";
import { IBestLensItem, IBrands } from "@/server/type/lens";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IBestLensItem[];
};

export default async function getLenslistByPeriodByOffset(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();
  const { period, page, limit } = req.query;
  const periodStr = String(period);
  const pageNum = Number(page);
  const limitNum = Number(limit);

  const result = await lensService.getLenslistByPeriodByOffset(periodStr, pageNum, limitNum);
  res.status(200).json({ result });
}
