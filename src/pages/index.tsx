import MainBestLensByBrandContainer from "@/containers/main/MainBestLensByBrandContainer";
import MainHeaderContainer from "@/containers/main/MainHeaderContainer";
import MainPromotionContainer from "@/containers/main/MainPromotionContainer";
import LensApi from "@/interfaces/lensApi";
import { IBrands, IDays } from "@/types/lens/lens";
import { GetServerSidePropsContext } from "next";
// import LensApi from "@/interfaces/lensApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [period, setPeriod] = useState<string>("oneday");
  const [brands, setBrands] = useState<IBrands[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const brandList = await lensApi.getLensBrandList();
      setBrands(brandList);
    })();
  }, []);

  return (
    <>
      <MainHeaderContainer period={period} setPeriod={setPeriod} />
      <MainPromotionContainer period={period} />
      <MainBestLensByBrandContainer period={period} brands={brands} />
    </>
  );
}
