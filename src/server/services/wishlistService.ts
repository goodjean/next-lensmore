import LensRepo from "../repos/lensRepo";
import LikeTableRepo from "../repos/likeTableRepo";
import { IBestLensItem } from "../type/lens";

export default class WishlistService {
  lensRepo = new LensRepo();
  likeTableRepo = new LikeTableRepo();

  async getWishListId(userId: string): Promise<IBestLensItem[]> {
    const likeIds = await this.likeTableRepo.getLikeIdListByUserId(userId);
    if (!likeIds) {
      return likeIds;
    }
    const likeIdArr = likeIds.map((likeId) => likeId.like_id);
    return await this.lensRepo.getLensWishlist(likeIdArr);
  }

  async addLike(userId: string, lensId: number): Promise<boolean> {
    const likeIds = await this.likeTableRepo.getLikeIdListByUserId(userId);

    if (!likeIds) {
      await this.likeTableRepo.addLike(userId, lensId);
      return true;
    }

    if (likeIds.some((likeId) => likeId.like_id === lensId)) {
      await this.likeTableRepo.cancelLike(userId, lensId);
      return false;
    } else {
      await this.likeTableRepo.addLike(userId, lensId);
      return true;
    }
  }

  async deleteAllWishlist(userId: string): Promise<boolean> {
    return await this.likeTableRepo.deleteAllWishlist(userId);
  }
}
