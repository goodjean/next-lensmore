import WishlistService from "@/server/services/wishlistService";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  result: boolean;
};

export default async function deleteAllWishlist(req: NextApiRequest, res: NextApiResponse<Data>) {
  const wishlistService = new WishlistService();
  const session = await getSession({ req });
  const userId = session?.user?.email;
  const userIdStr = String(userId);

  const result = await wishlistService.deleteAllWishlist(userIdStr);
  res.status(200).json({ result });
}
