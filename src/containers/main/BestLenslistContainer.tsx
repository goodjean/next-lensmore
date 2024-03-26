import LenslistItem from "@/components/main/LenslistItem";
import LensApi from "@/interfaces/lensApi";
import { IBestLensItem, IBrands } from "@/types/lens/lens";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BestLenslistStyle = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 6px;

  .brand-best-name {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    padding: 14px 22px;
    font-size: 1.18rem;
    // font-weight: 400;
    // color: rgb(52, 56, 59);
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;
    letter-spacing: -0.4px;
  }

  .brand-best-list {
    width: 100%;
    // max-height: 400px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    // gap: 3px;
    padding: 0 22px;
  }
`;

interface BestLenslistContainerProps {
  period: string;
  brand: IBrands;
  wishlist: IBestLensItem[];
}

function BestLenslistContainer({ period, brand, wishlist }: BestLenslistContainerProps) {
  const [lenslist, setLenslist] = useState<IBestLensItem[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenslistByPeriodAndBrand = await lensApi.getLenslistByPeriodAndBrand(period, brand.id);
      setLenslist(lenslistByPeriodAndBrand);
    })();
  }, [period, brand.id]);

  return (
    <BestLenslistStyle>
      <div className="brand-best-name">{`${brand.ko_name} 베스트`}</div>
      <div className="brand-best-list">
        {lenslist?.map((lens) => (
          <LenslistItem key={lens.id} lens={lens} wishlist={wishlist} />
        ))}
      </div>
    </BestLenslistStyle>
  );
}

export default BestLenslistContainer;
