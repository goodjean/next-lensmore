import SearchService from "@/server/services/searchService";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: number;
};

export default async function getLensAllCountByKeyword(req: NextApiRequest, res: NextApiResponse<Data>) {
  const searchService = new SearchService();
  const { name } = req.query;
  const nameStr = String(name);

  const result = await searchService.getLensAllCountByKeyword(nameStr);
  res.status(200).json({ result });
}
