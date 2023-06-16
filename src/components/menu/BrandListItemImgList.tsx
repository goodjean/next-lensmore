import React from "react";
import { IoArrowRedoOutline } from "react-icons/io5";
import styled from "styled-components";
import ShareButton from "../layout/ShareButton";
import { IBrands } from "@/types/lens/lens";

const BrandListItemImgListStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;

  .brand-logo-name-bx {
    width: 89%;
    display: flex;
    align-items: center;
    gap: 20px;
    border-right: 1px solid #e4e4e4;

    img {
      border-right: 1px solid #e4e4e4;
      border-radius: 2px;
      background-color: black;
      @media screen and (max-width: 500px) {
        width: 33px;
        height: 33px;
      }
    }

    .share-en-name {
      font-size: 13px;
      padding-bottom: 2px;
      color: black;
    }

    .share-ko-name {
      font-size: 12px;
      color: black;
    }
  }
`;

interface BrandListItemImgListProps {
  brand: IBrands;
}

function BrandListItemImgList({ brand }: BrandListItemImgListProps) {
  return (
    <BrandListItemImgListStyle>
      <a href={brand.url} target="_blank" rel="noreferrer" className="brand-logo-name-bx">
        <img src={brand.icon} alt="brand-icon" width={70} height={70} />
        <div className="brand-name">
          <p className="share-en-name">{brand.en_name}</p>
          <p className="share-ko-name">{brand.ko_name}</p>
        </div>
      </a>
      <ShareButton url={brand.url} name={brand.ko_name} />
    </BrandListItemImgListStyle>
  );
}

export default BrandListItemImgList;
