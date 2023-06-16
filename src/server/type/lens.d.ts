import { RowDataPacket } from "mysql2";

export interface IBrands {
  id: number;
  en_name: string;
  ko_name: string;
  url: string;
  thumbnail: string;
  icon: string;
  content: string;
}
export interface IBrandsEntity extends RowDataPacket {
  id: number;
  en_name: string;
  ko_name: string;
  url: string;
  thumbnail: string;
  icon: string;
  content: string;
}
export interface IDays {
  id: number;
  en: string;
  ko: string;
}
export interface IDaysEntity extends RowDataPacket {
  id: number;
  en: string;
  ko: string;
}
export interface IBestLensItem {
  id: number;
  name: string;
  price: number;
  img: string;
  reviewcount: number;
}
export interface IBestLensItemEntity extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  img: string;
  reviewcount: number;
}
export interface ILensDetail {
  id: number;
  name: string;
  color: string;
  color_img: string;
  price: number;
  graphic: string;
  detail_img: string;
  eye_thumbnail: string;
  model_thumbnail: string;
  period: string;
  reviewcount: string;
  page_url: string;
  brand: string;
}
export interface ILensDetailEntity extends RowDataPacket {
  id: number;
  name: string;
  color: string;
  color_img: string;
  price: number;
  graphic: string;
  detail_img: string;
  eye_thumbnail: string;
  model_thumbnail: string;
  period: string;
  reviewcount: string;
  page_url: string;
  brand: string;
}
