import LensRepo from "../repos/lensRepo";
import { IDays } from "../type/lens";
import { IPromotion } from "../type/promotion";

export default class PromotionService {
  lensRepo = new LensRepo();

  async getPromotionProductByPeriod(period: string): Promise<IPromotion> {
    // return await this.lensRepo.getPromotionProductByPeriod(period);
    const promotionEntites = await this.lensRepo.getPromotionProductByPeriod(period);
    const promotions = promotionEntites.filter((prom) => prom.model_thumbnail !== undefined);
    return promotions[66];
  }
}
