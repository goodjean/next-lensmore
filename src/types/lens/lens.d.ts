// brands & colors & days Table data type
export interface IBrands {
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

export interface IColors {
  id: number;
  color: string;
}

// Filtering data type

export interface IisPositiveCondi {
  min: number;
  max: number;
  isPositive: boolean;
}

export interface IMinMaxText {
  id: number;
  text: string;
  min: number;
  max: number;
}

export interface IMinMax {
  id: number;
  min: number;
  max: number;
}

//promotion

export interface IPromotion {
  id: number;
  name: string;
  model_thumbnail: string;
  period_classifi: string;
}

//lens

export interface IBestLensItem {
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

// search

export interface IHotkeyword {
  id: number;
  name: string;
  reviewcount: number;
}
