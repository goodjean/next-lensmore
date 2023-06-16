import React from "react";
import BestLenslistContainer from "./BestLenslistContainer";
import styled from "styled-components";
import { IBrands } from "@/types/lens/lens";

const MainBestLensStyle = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 15px;
  gap: 10px;
`;

interface MainBestLensProps {
  period: string;
  brands: IBrands[];
}

function MainBestLensByBrandContainer({ period, brands }: MainBestLensProps) {
  return (
    <MainBestLensStyle>
      {brands.map((brand) => (
        <BestLenslistContainer key={brand.id} period={period} brand={brand} />
      ))}
    </MainBestLensStyle>
  );
}

export default MainBestLensByBrandContainer;
