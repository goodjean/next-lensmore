import LensRepo from "../repos/lensRepo";
import { IBestLensItem } from "../type/lens";

export default class FilterService {
  lensRepo = new LensRepo();

  async getFilteredLensListByOffset(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<IBestLensItem[]> {
    return await this.lensRepo.getFilteredLenslistByOffset(period, color, graphic, price, brand, page, limit);
  }

  async getAllFilteredLensList(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[]
  ): Promise<IBestLensItem[]> {
    return await this.lensRepo.getAllFilteredLensList(period, color, graphic, price, brand);
  }
}
