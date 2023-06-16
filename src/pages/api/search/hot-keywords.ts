import SearchService from "@/server/services/searchService";
import { IHotkeyword } from "@/server/type/search";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IHotkeyword[];
};

export default async function getHotSearchKeywords(req: NextApiRequest, res: NextApiResponse<Data>) {
  const searchService = new SearchService();

  const result = await searchService.getHotSearchKeywords();
  res.status(200).json({ result });
}
