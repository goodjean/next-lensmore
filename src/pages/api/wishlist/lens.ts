import WishlistService from "@/server/services/wishlistService";
import { IBestLensItem } from "@/server/type/lens";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  result: IBestLensItem[];
};

export default async function getLensWishlist(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await getSession({ req });
  const userId = session?.user?.email;
  const wishlistService = new WishlistService();
  const userIdStr = String(userId);

  const result = await wishlistService.getWishListId(userIdStr);
  res.status(200).json({ result });
}
