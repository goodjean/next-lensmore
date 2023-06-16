import React from "react";
import styled from "styled-components";
import ShareButton from "../layout/ShareButton";

const LensDetailInfoSubStyle = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  padding: 25px 15px;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;

  .url-bx {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    border: 1px solid #e4e4e4;
    border-radius: 2px;
  }

  .brand-logo-name-bx {
    width: 89%;
    display: flex;
    align-items: center;
    gap: 30px;
    border-right: 1px solid #e4e4e4;
  }

  img {
    border-right: 1px solid #e4e4e4;
    border-radius: 5px;
    background-color: black;
    @media screen and (max-width: 500px) {
      width: 50px;
      height: 50px;
    }
  }

  p {
    padding: 1.4px 0;
  }

  .detail-img-title {
    border-top: 1px solid #e4e4e4;
    margin: 30px 0;
    padding-top: 30px;
    font-size: 18px;
  }

  .detail-desc-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .detail-imgs {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .detail-img {
    width: 100%;
    height: 100%;
  }
`;

interface LensDetailInfoSubProps {
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

function LensDetailInfoSub({ lensDetail }: LensDetailInfoSubProps) {
  return (
    <LensDetailInfoSubStyle>
      <div className="url-bx">
        <a href={lensDetail.page_url} target="_blank" rel="noreferrer" className="brand-logo-name-bx">
          <img
            src={
              lensDetail.brand === "오렌즈"
                ? "https://o-lens.com/images/common/ico-olens.png"
                : lensDetail.brand === "렌즈미"
                ? "https://lens-me.com/web/upload/favicon_20180329132459.ico"
                : "https://lenstown.co.kr/lenstown/images/favicon.ico"
            }
            alt="brand-icon"
            width={80}
            height={80}
          />
          <div className="brand-name">
            <p>{lensDetail.brand}</p>
            <p>{lensDetail.name}</p>
          </div>
        </a>
        <ShareButton url={lensDetail.page_url} name={lensDetail.brand} />
      </div>
      <div className="detail-img-title">상세보기</div>
      <div className="detail-desc-container">
        {!lensDetail.detail_img ? (
          <div className="detail-imgs">
            <img className="detail-img" src={lensDetail.eye_thumbnail} alt="eye" />
          </div>
        ) : (
          <div className="detail-imgs">
            <img className="detail-img" src={lensDetail.detail_img} alt="detail-sub-visual" />
          </div>
        )}
      </div>
    </LensDetailInfoSubStyle>
  );
}

export default LensDetailInfoSub;
