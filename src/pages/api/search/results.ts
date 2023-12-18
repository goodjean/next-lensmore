import SearchService from "@/server/services/searchService";
import { IBestLensItem, ILensItemAndCountResult } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: ILensItemAndCountResult;
};

export default async function getListCountAndLensitemListByKeywordByOffset(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const searchService = new SearchService();
  const { name, page, size } = req.query;

  const nameStr = String(name);
  const pageNum = Number(page);
  const sizeNum = Number(size);

  const result = await searchService.getListCountAndLensitemListByKeywordByOffset(nameStr, pageNum, sizeNum);
  res.status(200).json({ result });
}
