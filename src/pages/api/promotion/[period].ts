import PromotionService from "@/server/services/promotionService";
import { IPromotion } from "@/server/type/promotion";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IPromotion;
};

export default async function promotionItem(req: NextApiRequest, res: NextApiResponse<Data>) {
  const promotionService = new PromotionService();
  const { query } = req;
  const { period } = query;

  const periodStr = String(period);

  const result = await promotionService.getPromotionProductByPeriod(periodStr);
  res.status(200).json({ result });
}
