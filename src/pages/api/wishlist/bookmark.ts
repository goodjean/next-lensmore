import WishlistService from "@/server/services/wishlistService";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: number[] | undefined;
};

export default async function addToLike(req: NextApiRequest, res: NextApiResponse<Data>) {
  const wishlistService = new WishlistService();
  const { userId, lensId } = req.body;

  const result = await wishlistService.addToLike(userId, lensId);
  res.status(200).json({ result });
}
