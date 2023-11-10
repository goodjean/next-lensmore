import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IBestLensItem } from "@/types/lens/lens";
import HeartItem from "../layout/HeartItem";

const LensItemStyle = styled.div`
  width: 31.5%;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  position: relative;

  // .img-heart-bx {
  //   position: relative;
  // }

  .lens-img-bx {
    width: 100%;
    height: 187px;

    @media screen and (max-width: 500px) {
      height: 117px;
    }
  }

  .lens-img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }

  .lens-item-desc {
    width: 100%;
    padding: 0.7rem 0.1em 0 1.5px;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    text-align: left;
    font-size: 0.93rem;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    letter-spacing: -0.4px;
    gap: 8px;
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;
  }

  .lens-item-name {
    width: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14.8px;
    max-height: 17px;
    font-weight: bold;
    @media screen and (max-width: 500px) {
      font-size: 13px;
    }
  }

  .lens-item-price {
    font-size: 14.8px;
    @media screen and (max-width: 500px) {
      font-size: 13px;
    }
  }
`;

interface LenslistItemProps {
  lens: IBestLensItem;
}

function LenslistItem({ lens }: LenslistItemProps) {
  const router = useRouter();

  function clickDesc() {
    router.push(`/product/${lens.id}`);
  }
  return (
    <LensItemStyle>
      <Link href={`/product/${lens.id}`} className="img-heart-bx">
        <div className="lens-img-bx">
          <img src={lens.img} alt="lens-img" className="lens-img" />
        </div>
      </Link>
      <div>
        <div className="lens-item-desc" onClick={clickDesc}>
          <span className="lens-item-name">{lens.name}</span>
          <span className="lens-item-price">{lens.price.toLocaleString()}원</span>
        </div>
        <HeartItem lensId={lens.id} />
      </div>
    </LensItemStyle>
  );
}

export default LenslistItem;
