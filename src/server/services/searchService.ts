import LensRepo from "../repos/lensRepo";
import { IBestLensItem, ILensItemAndCountResult } from "../type/lens";
import { IHotkeyword } from "../type/search";

export default class SearchService {
  lensRepo = new LensRepo();

  async getHotSearchKeywords(): Promise<IHotkeyword[]> {
    const HotKeywords = (await this.lensRepo.getHotSearchKeywords()).slice(0, 10);
    HotKeywords.sort(function (a, b) {
      return b.reviewcount - a.reviewcount;
    });
    return HotKeywords;
  }

  async getListCountAndLensitemListByKeywordByOffset(
    name: string,
    page: number,
    size: number
  ): Promise<ILensItemAndCountResult> {
    const searchLenslist = await this.lensRepo.getListCountAndLensitemListByKeywordByOffset(name, page, size);
    return searchLenslist;
  }

  async getLensAllCountByKeyword(name: string): Promise<number> {
    const searchLenslistAllCount = await this.lensRepo.getLensAllCountByKeyword(name);
    return searchLenslistAllCount;
  }
}
