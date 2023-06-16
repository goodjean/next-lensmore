import LensRepo from "../repos/lensRepo";
import UserRepo from "../repos/userRepo";
import { IBestLensItem } from "../type/lens";

export default class WishlistService {
  userRepo = new UserRepo();
  lensRepo = new LensRepo();

  async getUserWishlistIdList(userId: string): Promise<number[]> {
    const userWishlist = await this.userRepo.getUserWishlist(userId);
    if (!userWishlist.wishlist) {
      return [];
    }
    const userWishlistParse = JSON.parse(userWishlist.wishlist);
    const userWishlistIdArr = userWishlistParse.map(Number);
    return userWishlistIdArr;
  }

  async convertToGetAddToLikeList(userWishlistIdArr: number[], userId: string): Promise<number[] | undefined> {
    const userWishlistArrToStrArr = userWishlistIdArr.map(String);
    const userWishlistIdJSON = JSON.stringify(userWishlistArrToStrArr);
    const wishlistId = await this.userRepo.addToLike(userWishlistIdJSON, userId);
    if (wishlistId) {
      return userWishlistIdArr;
    }
  }
  // ---------------------------------------------------------------------------

  async getLensWishlist(userId: string): Promise<IBestLensItem[]> {
    // const userWishlist = await this.userRepo.getUserWishlist(userId);
    // // {wishlist: '['1','2,',3']'}
    // if (!userWishlist.wishlist) {
    //   return [];
    // }
    // const userWishlistParse = JSON.parse(userWishlist.wishlist);
    // const userWishlistIdArr = userWishlistParse.map(Number);
    const userWishlistIdArr = await this.getUserWishlistIdList(userId);
    const lensWishlist = await this.lensRepo.getLensWishlist(userWishlistIdArr);
    return lensWishlist;
  }

  async getWishListId(userId: string): Promise<number[]> {
    return await this.getUserWishlistIdList(userId);
  }

  async addToLike(userId: string, lensId: number): Promise<number[] | undefined> {
    const userWishlistIdArr = await this.getUserWishlistIdList(userId);

    if (!userWishlistIdArr.includes(lensId)) {
      userWishlistIdArr.push(lensId);
      return this.convertToGetAddToLikeList(userWishlistIdArr, userId);
    } else {
      userWishlistIdArr.forEach((lenId: number, index: number) => {
        if (lenId === lensId) {
          userWishlistIdArr.splice(index, 1);
        }
      });
      // 변경된 userWishlistIdArr를 user wishlist db에 수정
      return this.convertToGetAddToLikeList(userWishlistIdArr, userId);
    }
  }

  async deleteAllWishlist(userId: string): Promise<boolean> {
    return await this.userRepo.deleteAllWishlist(userId);
  }
}
