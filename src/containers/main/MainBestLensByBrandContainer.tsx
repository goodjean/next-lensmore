import React from "react";
import BestLenslistContainer from "./BestLenslistContainer";
import styled from "styled-components";

const MainBestLensStyle = styled.section`
  width: 100%;
  height: 40%;
`;

interface MainBestLensProps {
  period: string;
  brands: { id: number; brand: string }[];
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
