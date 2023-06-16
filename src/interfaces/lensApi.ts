import withAxios from "@/server/api/api";
import { IBrands, IDays, IBestLensItem, ILensDetail } from "@/types/lens/lens";
import axios from "axios";

export default class LensApi {
  async getLensBrandList(): Promise<IBrands[]> {
    const res = await axios.get(`/api/lens/brands`);

    // const res = await withAxios({
    //   method: "get",
    //   url: "/lens/brands",
    // });

    // return res.result

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

  async getLenslistByPeriodByOffset(period: string, page: number, limit: number): Promise<IBestLensItem[]> {
    const res = await axios.get(`/api/lens/results?period=${period}&page=${page}&limit=${limit}`);
    return res.data.result;
  }

  async getLenslistByPeriod(period: string): Promise<number> {
    const res = await axios.get(`/api/lens/all-results?period=${period}`);
    return res.data.result;
  }
}
