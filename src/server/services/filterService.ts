import LensRepo from "../repos/lensRepo";
import { IBestLensItem, ILensItemAndCountResult } from "../type/lens";

export default class FilterService {
  lensRepo = new LensRepo();

  async getListCountAndFilteredLensListByOffset(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<ILensItemAndCountResult> {
    const lensItemsAndCount = await this.lensRepo.getListCountAndFilteredLenslistByOffset(
      period,
      color,
      graphic,
      price,
      brand,
      page,
      limit
    );
    return lensItemsAndCount;
  }
}
