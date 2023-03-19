import MainBestLensByBrandContainer from "@/containers/main/MainBestLensByBrandContainer";
import MainHeaderContainer from "@/containers/main/MainHeaderContainer";
import MainPromotionContainer from "@/containers/main/MainPromotionContainer";
import { useState } from "react";

export default function Home() {
  const [period, setPeriod] = useState<string>("oneday");
  const [brands, setBrands] = useState([
    { id: 1, brand: "오렌즈" },
    { id: 2, brand: "렌즈미" },
    { id: 3, brand: "렌즈타운" },
  ]);

  return (
    <>
      <MainHeaderContainer period={period} setPeriod={setPeriod} />
      <MainPromotionContainer period={period} />
      <MainBestLensByBrandContainer period={period} brands={brands} />
    </>
  );
}
