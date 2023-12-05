import FilterService from "@/server/services/filterService";
import { IBestLensItem, ILensItemAndCountResult } from "@/server/type/lens";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: ILensItemAndCountResult;
};

interface FilterQuery {
  period: string;
  color: string;
  graphic: string;
  price: string;
  brand: string;
  page: number;
  limit: number;
}

export default async function getListCountAndFilteredLensListByOffset(
  req: NextApiRequest & { query: FilterQuery },
  res: NextApiResponse<Data>
) {
  const filterService = new FilterService();
  const { period, color, graphic, price, brand, page, limit } = req.query;
  const periodParse = JSON.parse(period);
  const colorParse = JSON.parse(color);
  const graphicParse = JSON.parse(graphic);
  const priceParse = JSON.parse(price);
  const brandParse = JSON.parse(brand);

  // const colorNum = Number(color) //타입변환 && params에서 querystring으로 바꿧으니 알맞게 처리

  // const graphicValue = graphic.map((g) => ({ ...g, isPositive: JSON.parse(g.isPositive) }));
  // const priceValue = price.map((p) => ({ ...p, isPositive: JSON.parse(p.isPositive) }));
  const pageNum = Number(page);
  const limitNum = Number(limit);

  const result = await filterService.getListCountAndFilteredLensListByOffset(
    periodParse,
    colorParse,
    graphicParse,
    priceParse,
    brandParse,
    page,
    limit
  );
  res.status(200).json({ result });
}
