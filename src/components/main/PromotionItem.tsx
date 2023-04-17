import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const PromotionItemStyle = styled.div`
  width: 100%;
  // height: 40%;
  height: 800px;
  padding: 26px;
  @media screen and (max-width: 700px) {
    height: 40%;
  }

  .promotion-img-box {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .loading-img {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }

  .promotion-img {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }
`;

interface PromotionItemProps {
  promotion: { id: number; name: string; model_thumbnail: string; period_classifi: string };
}

function PromotionItem({ promotion }: PromotionItemProps) {
  const router = useRouter();

  function clickImg() {
    // router.push(`/product/detail/${promotion?.id}`);
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
