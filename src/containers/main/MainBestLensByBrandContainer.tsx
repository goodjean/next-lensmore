import React, { useEffect, useState } from "react";
import BestLenslistContainer from "./BestLenslistContainer";
import styled from "styled-components";
import { IBestLensItem, IBrands } from "@/types/lens/lens";
import WishlistApi from "@/interfaces/wishlistApi";

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
  const [wishlist, setWishlist] = useState<IBestLensItem[]>([]);

  useEffect(() => {
    (async () => {
      const wishlistApi = new WishlistApi();
      const wishlist = await wishlistApi.getWishList();
      setWishlist(wishlist);
    })();
  }, []);

  return (
    <MainBestLensStyle>
      {brands.map((brand) => (
        <BestLenslistContainer key={brand.id} period={period} brand={brand} wishlist={wishlist} />
      ))}
    </MainBestLensStyle>
  );
}

export default MainBestLensByBrandContainer;
