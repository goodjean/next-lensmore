import { IBestLensItem, ILensItemAndCountResult, IisPositiveCondi } from "@/types/lens/lens";
import axios from "@/server/api/axios";

export default class FilterApi {
  async getListCountAndFilteredLensListByOffset(
    period: string[],
    color: number[],
    graphic: IisPositiveCondi[],
    price: IisPositiveCondi[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<ILensItemAndCountResult> {
    const res = await axios.get(
      `/api/filter/results?period=${JSON.stringify(period)}&color=${JSON.stringify(color)}&graphic=${JSON.stringify(
        graphic
      )}&price=${JSON.stringify(price)}&brand=${JSON.stringify(brand)}&page=${page}&limit=${limit}`
    );
    return res.data.result;
  }
}
