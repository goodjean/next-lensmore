import LensService from "@/server/services/lensService";
import { ILensItemAndCountResult } from "@/server/type/lens";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: ILensItemAndCountResult;
};

export default async function getListCountAndLenslistByPeriodByOffset(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();
  const { period, page, limit } = req.query;
  const periodStr = String(period);
  const pageNum = Number(page);
  const limitNum = Number(limit);

  const result = await lensService.getListCountAndLenslistByPeriodByOffset(periodStr, pageNum, limitNum);
  res.status(200).json({ result });
}
