import LensService from "@/server/services/lensService";
import { IBrands } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IBrands[];
};

export default async function brand(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lensService = new LensService();

  const result = await lensService.getLensBrandList();
  res.status(200).json({ result });
}
