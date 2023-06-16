import SearchService from "@/server/services/searchService";
import { IBestLensItem } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IBestLensItem[];
};

export default async function getLensitemListByKeywordByOffset(req: NextApiRequest, res: NextApiResponse<Data>) {
  const searchService = new SearchService();
  const { name, page, limit } = req.query;

  const nameStr = String(name);
  const pageNum = Number(page);
  const limitNum = Number(limit);

  const result = await searchService.getLensitemListByKeywordByOffset(nameStr, pageNum, limitNum);
  res.status(200).json({ result });
}
