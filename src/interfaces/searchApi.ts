import { IBestLensItem, IHotkeyword, ILensItemAndCountResult, IPromotion } from "@/types/lens/lens";
import axios from "@/server/api/axios";

export default class SearchApi {
  async getHotSearchKeywords(): Promise<IHotkeyword[]> {
    const res = await axios.get("/api/search/hot-keywords");
    return res.data.result;
  }

  async getListCountAndLensitemListByKeywordByOffset(
    name: string,
    page: number,
    size: number
  ): Promise<ILensItemAndCountResult> {
    const res = await axios.get(`/api/search/results?name=${name}&page=${page}&size=${size}`);
    return res.data.result;
  }

  async getLensAllCountByKeyword(name: string): Promise<number> {
    const res = await axios.get(`/api/search/count?name=${name}`);
    return res.data.result;
  }

  async getWishListForSearchPage(id: string): Promise<IBestLensItem[]> {
    const res = await axios.post(`/api/wishlist/wishListIds`, { id });
    return res.data.result;
  }
}
