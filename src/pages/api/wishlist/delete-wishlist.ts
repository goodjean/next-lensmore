import WishlistService from "@/server/services/wishlistService";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: boolean;
};

export default async function deleteAllWishlist(req: NextApiRequest, res: NextApiResponse<Data>) {
  const wishlistService = new WishlistService();
  const { userId } = req.body;

  const result = await wishlistService.deleteAllWishlist(userId);
  res.status(200).json({ result });
}
