import { IPromotion } from "@/types/lens/lens";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const PromotionItemStyle = styled.div`
  width: 100%;
  max-width: 650px;
  padding: 21px 19px 24px 19px;

  .promotion-img-box {
    width: 100%;
    height: 740px;
    cursor: pointer;

    @media screen and (max-width: 500px) {
      height: 500px;
    }
  }

  .loading-img {
    width: 100%;
    border-radius: 13px;
  }

  .promotion-img {
    width: 100%;
    height: 100%;
    max-height: 740px;
    border-radius: 8px;
  }
`;

interface PromotionItemProps {
  promotion: IPromotion | undefined;
}

function PromotionItem({ promotion }: PromotionItemProps) {
  const router = useRouter();

  function clickImg() {
    router.push(`/product/${promotion?.id}`);
  }

  return (
    <PromotionItemStyle>
      <div className="promotion-img-box" onClick={clickImg}>
        {!promotion ? (
          <img
            className="loading-img"
            src="https://previews.123rf.com/images/estherpoon/estherpoon1706/estherpoon170600035/80108153-%EB%A1%9C%EB%94%A9-%EC%95%84%EC%9D%B4%EC%BD%98.jpg"
            alt="loading..."
          />
        ) : (
          <img src={promotion.model_thumbnail} alt="promotion item" className="promotion-img" />
        )}
      </div>
    </PromotionItemStyle>
  );
}

export default PromotionItem;
