import LensRepo from "../repos/lensRepo";
import { IBrands, IDays, IBestLensItem, ILensDetail } from "../type/lens";

export default class LensService {
  lensRepo = new LensRepo();

  async getLensBrandList(): Promise<IBrands[]> {
    return await this.lensRepo.getLensBrandList();
  }

  async getLensDayList(): Promise<IDays[]> {
    return await this.lensRepo.getLensDayList();
  }

  async getLenslistByPeriodAndBrand(period: string, brandId: number): Promise<IBestLensItem[]> {
    const lensItems = await this.lensRepo.getLenslistByPeriodAndBrand(period, brandId);
    lensItems.sort(function (a, b) {
      return b.reviewcount - a.reviewcount;
    });
    const lensItemByPeriodAndBrand = lensItems.slice(0, 3);
    return lensItemByPeriodAndBrand;
  }

  async getLensDetailById(id: number): Promise<ILensDetail | undefined> {
    const lensDetailById = await this.lensRepo.getLensDetailById(id);
    const product = lensDetailById.find((lensDetail) => lensDetail.id === id);
    return product;
  }

  async getLenslistByPeriodByOffset(period: string, page: number, limit: number): Promise<IBestLensItem[]> {
    return await this.lensRepo.getLenslistByPeriodByOffset(period, page, limit);
  }

  async getLenslistByPeriod(period: string): Promise<number> {
    return await this.lensRepo.getLenslistByPeriod(period);
  }
}
