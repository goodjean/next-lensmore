import WishlistService from "@/server/services/wishlistService";
import { IBestLensItem } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: IBestLensItem[] | undefined;
};

export default async function getLensWishlist(req: NextApiRequest, res: NextApiResponse<Data>) {
  const wishlistService = new WishlistService();
  const { user_id } = req.query;
  const userIdStr = String(user_id);

  const result = await wishlistService.getLensWishlist(userIdStr);
  res.status(200).json({ result });
}
