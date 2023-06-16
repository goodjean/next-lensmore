import { RowDataPacket } from "mysql2";

export interface IPromotion {
  id: number;
  name: string;
  model_thumbnail: string;
  period_classifi: string;
}

export interface IPromotionEntity extends RowDataPacket {
  id: number;
  name: string;
  model_thumbnail: string;
  period_classifi: string;
}
