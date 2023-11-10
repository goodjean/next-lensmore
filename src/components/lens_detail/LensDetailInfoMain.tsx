import React from "react";
import styled from "styled-components";

const LensDetailInfoMainStyle = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;

  .detail-thumbnail-container {
    width: 100%;
    padding: 15px;

    .detail-thumbnail {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .detail-desc-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 15px;
  }

  .detail-main-desc {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 2.5;
    padding-top: 16px;
    padding-bottom: 4px;
    border-bottom: 1px solid lightgray;
    position: relative;
  }

  p {
    font-size: 1.4rem;
    letter-spacing: -0.1px;
  }

  .detail-desc-price {
    display: flex;
    align-items: baseline;
    font-size: 1.1rem;
    padding-bottom: 17px;
  }

  .detail-desc-title {
    color: #6e6e6e;
    margin-right: 8px;
    font-size: 17px;
  }

  .detail-sub-desc {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    line-height: 1.9;
    color: #6e6e6e;
    padding-top: 20px;
  }

  .detail-graph-period-color {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .color-img-bx {
    display: flex;
    padding-top: 3px;
  }

  .color-img {
    width: 70px;
    height: 70px;
  }

  .review-brand {
    display: flex;
    flex-direction: column;
    justify-content: end;
    font-size: 15px;
    color: gray;
  }

  .props {
    padding-right: 8px;
  }
`;

interface LensDetailInfoMainProps {
  lensDetail: {
    id: number;
    name: string;
    color: string;
    color_img: string;
    price: number;
    graphic: string;
    detail_img: string;
    eye_thumbnail: string | undefined;
    model_thumbnail: string;
    period: string;
    reviewcount: string;
    page_url: string;
    brand: string;
  };
}

function LensDetailInfoMain({ lensDetail }: LensDetailInfoMainProps) {
  return (
    <LensDetailInfoMainStyle>
      <div className="detail-thumbnail-container">
        {lensDetail.model_thumbnail ? (
          <img src={lensDetail.model_thumbnail} alt="thumbnail" className="detail-thumbnail" />
        ) : (
          <img src={lensDetail.eye_thumbnail} alt="eye_thumbnail" className="detail-thumbnail" />
        )}
      </div>
      <div className="detail-desc-container">
        <div className="detail-main-desc">
          <div className="detail-name-price">
            <p>{lensDetail.name}</p>
            <p className="detail-desc-price">
              <span className="detail-desc-title">가격:</span>
              <span>{lensDetail.price}원</span>
            </p>
          </div>
          <div className="color-img-bx">
            {!lensDetail.color_img ? (
              <span className="none-color"></span>
            ) : (
              <img src={lensDetail.color_img} alt="color" className="color-img" />
            )}
          </div>
        </div>
        <div className="detail-sub-desc">
          <div className="detail-graph-period-color">
            <div>
              <span className="detail-desc-title">직경:</span>
              <span>{lensDetail.graphic}mm</span>
            </div>
            <div>
              <span className="detail-desc-title">착용기간:</span>
              <span>{lensDetail.period}</span>
            </div>
            <div>
              <span className="detail-desc-title">색상:</span>
              <span>{lensDetail.color}</span>
            </div>
          </div>
          <div className="review-brand">
            <div className="review">
              <span className="props">리뷰:</span>
              <span>{lensDetail.reviewcount}</span>
            </div>
            <div className="brand">
              <span className="props">브랜드:</span>
              <span>{lensDetail.brand}</span>
            </div>
          </div>
        </div>
      </div>
    </LensDetailInfoMainStyle>
  );
}

export default LensDetailInfoMain;
