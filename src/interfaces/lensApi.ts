import axios from "@/server/api/axios";
import { IBrands, IDays, IBestLensItem, ILensDetail, ILensItemAndCountResult } from "@/types/lens/lens";
// import axios from "axios";

export default class LensApi {
  async getLensBrandList(): Promise<IBrands[]> {
    const res = await axios.get(`/api/lens/brands`); //주의 ssr
    return res.data.result;
  }

  async getLensDayList(): Promise<IDays[]> {
    const res = await axios.get(`/api/lens/days`);
    return res.data.result;
  }

  async getLenslistByPeriodAndBrand(period: string, brandId: number): Promise<IBestLensItem[]> {
    const res = await axios.get(`/api/lens/best-items?period=${period}&brandId=${brandId}`);
    return res.data.result;
  }

  async getLensDetailById(id: number): Promise<ILensDetail | undefined> {
    const res = await axios.get(`/api/detail/${id}`);
    return res.data.result;
  }

  async getListCountAndLenslistByPeriodByOffset(
    period: string,
    page: number,
    size: number
  ): Promise<ILensItemAndCountResult> {
    const res = await axios.get(`/api/lens/results?period=${period}&page=${page}&size=${size}`);
    return res.data.result;
  }

  async getLenslistByPeriod(period: string): Promise<number> {
    const res = await axios.get(`/api/lens/all-results?period=${period}`);
    return res.data.result;
  }
}
