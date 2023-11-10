import { IBestLensItem, IHotkeyword, IPromotion } from "@/types/lens/lens";
import axios from "axios";

export default class SearchApi {
  async getHotSearchKeywords(): Promise<IHotkeyword[]> {
    const res = await axios.get("/api/search/hot-keywords");
    return res.data.result;
  }

  async getLensitemListByKeywordByOffset(name: string, page: number, limit: number): Promise<IBestLensItem[]> {
    const res = await axios.get(`/api/search/results?name=${name}&page=${page}&limit=${limit}`);
    return res.data.result;
  }

  async getLensAllCountByKeyword(name: string): Promise<number> {
    const res = await axios.get(`/api/search/count?name=${name}`);
    return res.data.result;
  }
}
