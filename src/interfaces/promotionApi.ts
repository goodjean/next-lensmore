import { IPromotion } from "@/types/lens/lens";
import axios from "axios";

export default class PromotionApi {
  async getPromotionProductByPeriod(period: string): Promise<IPromotion> {
    const res = await axios.get(`/api/promotion/${period}`);
    return res.data.result;
  }
}
