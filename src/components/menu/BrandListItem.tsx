import React from "react";
import styled from "styled-components";
import BrandListItemImgList from "./BrandListItemImgList";
import { IBrands } from "@/types/lens/lens";

const BrandListItemStyle = styled.li`
  width: 100%;
  height: 278px;
  display: flex;
  padding: 10px 14px 10px 10px;
  border-bottom: 2px solid #e1e1e1;
  @media screen and (max-width: 500px) {
    height: 190px;
  }

  .thumbnail-bx {
    width: 33%;

    .thumb-img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }

  .brand-desc-bx {
    width: 67%;
    heigth: 100%;
    padding: 10px 0 10px 30px;

    .brand-desc {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand-main-name {
      padding-bottom: 13px;
      border-bottom: 1px solid #e8e8e8;
      font-size: 17px;
    }

    p {
      font-size: 13.3px;
      @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
      font-family: "Nanum Gothic", sans-serif;
      color: gray;
      font-weight: normal;
      letter-spacing: -0.1px;
    }
  }
`;

interface BrandListItemProps {
  brand: IBrands;
}

function BrandListItem({ brand }: BrandListItemProps) {
  return (
    <BrandListItemStyle>
      <div className="thumbnail-bx">
        <img className="thumb-img" src={brand.thumbnail} alt="thumbnail" />
      </div>
      <div className="brand-desc-bx">
        <div className="brand-desc">
          <div className="brand-main-name">
            <a href={brand.url} target="_blank" rel="noreferrer">
              {brand.en_name}
            </a>
          </div>
          <p>{brand.content}</p>
          <div>
            <BrandListItemImgList brand={brand} />
          </div>
        </div>
      </div>
    </BrandListItemStyle>
  );
}

export default BrandListItem;
