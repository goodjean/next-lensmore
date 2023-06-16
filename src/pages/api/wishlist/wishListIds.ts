import WishlistService from "@/server/services/wishlistService";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: number[];
};

export default async function getWishListId(req: NextApiRequest, res: NextApiResponse<Data>) {
  const wishlistService = new WishlistService();
  const { userid } = req.query;
  const userIdStr = String(userid);

  const result = await wishlistService.getWishListId(userIdStr);
  res.status(200).json({ result });
}
