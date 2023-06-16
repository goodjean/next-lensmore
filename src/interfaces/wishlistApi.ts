import { IBestLensItem } from "@/types/lens/lens";
import axios from "axios";

export default class WishlistApi {
  async getLensWishList(userId: string): Promise<IBestLensItem[]> {
    const res = await axios.get(`/api/wishlist/${userId}`);
    return res.data.result;
  }

  async getWishListId(userId: string): Promise<number[]> {
    const res = await axios.get(`/api/wishlist/wishListIds?userid=${userId}`);
    return res.data.result;
  }

  async addToLike(userId: string, lensId: number): Promise<number[]> {
    const res = await axios.post(`/api/wishlist/bookmark`, { userId, lensId });
    return res.data.result;
  }

  async deleteAllWishlist(userId: string): Promise<boolean> {
    const res = await axios.post(`/api/wishlist/delete-wishlist`, { userId });
    return res.data.result;
  }
}
