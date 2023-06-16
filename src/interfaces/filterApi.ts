import { IBestLensItem, IisPositiveCondi } from "@/types/lens/lens";
import axios from "axios";

export default class FilterApi {
  async getFilteredLensListByOffset(
    period: string[],
    color: number[],
    graphic: IisPositiveCondi[],
    price: IisPositiveCondi[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<IBestLensItem[]> {
    const res = await axios.get(
      `/api/filter/results?period=${JSON.stringify(period)}&color=${JSON.stringify(color)}&graphic=${JSON.stringify(
        graphic
      )}&price=${JSON.stringify(price)}&brand=${JSON.stringify(brand)}&page=${page}&limit=${limit}`
    );
    return res.data.result;
  }

  async getAllFilteredLensList(
    period: string[],
    color: number[],
    graphic: IisPositiveCondi[],
    price: IisPositiveCondi[],
    brand: number[]
  ): Promise<IBestLensItem[]> {
    const res = await axios.get(
      `/api/filter/all-count/result?period=${JSON.stringify(period)}&color=${JSON.stringify(
        color
      )}&graphic=${JSON.stringify(graphic)}&price=${JSON.stringify(price)}&brand=${JSON.stringify(brand)}`
    );
    return res.data.result;
  }
}
