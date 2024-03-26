import WishlistService from "@/server/services/wishlistService";
import { IBestLensItem } from "@/server/type/lens";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  result: IBestLensItem[];
};

export default async function getWishListId(req: NextApiRequest, res: NextApiResponse<Data>) {
  const wishlistService = new WishlistService();
  const session = await getSession({ req });
  let userId = session?.user?.email;
  if (!session) {
    const { id } = req.body;
    if (!id) {
      return [];
    }
    userId = id;
  }

  const userIdStr = String(userId);

  const result = await wishlistService.getWishListId(userIdStr);
  res.status(200).json({ result });
}
