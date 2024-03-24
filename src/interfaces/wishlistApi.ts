import { IAddLike, IBestLensItem } from "@/types/lens/lens";
import axios from "axios";

export default class WishlistApi {
  async getWishList(): Promise<IBestLensItem[]> {
    const res = await axios.get(`/api/wishlist/wishListIds`);
    return res.data.result;
  }

  async addLike(userId: string, lensId: number): Promise<boolean> {
    const res = await axios.post(`/api/wishlist/bookmark`, { userId, lensId });
    return res.data.result;
  }

  async deleteAllWishlist(): Promise<boolean> {
    const res = await axios.post(`/api/wishlist/delete-wishlist`);
    return res.data.result;
  }
}
