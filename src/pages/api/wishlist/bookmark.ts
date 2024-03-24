import WishlistService from "@/server/services/wishlistService";
import { IAddLike } from "@/server/type/wishlist";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  result: boolean;
};

export default async function bookmark(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const session = await getSession({ req });
  // const userId = session?.user?.email;
  // const userIdStr = String(userId);
  const wishlistService = new WishlistService();
  const { userId, lensId } = req.body;
  const userIdStr = String(userId);
  const lensIdNum = Number(lensId);

  const result = await wishlistService.addLike(userIdStr, lensIdNum);
  res.status(200).json({ result });
}
