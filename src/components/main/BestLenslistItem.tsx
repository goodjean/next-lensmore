import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { BsFillHeartFill, BsHeart, BsHeartFill } from "react-icons/bs";

const BestLensItemStyle = styled.div`
  width: 33%;
  height: 100%;
  padding: 0.73rem;
  border: 1px solid lightgray;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    font-size: 0.7rem;
    padding: 0.6rem;
  }

  .heart {
    text-align: center;
  }

  .lens-img {
    width: 100%;
    height: 60%;
    border-radius: 13px;
  }

  .lens-item-desc {
    width: 100%;
    height: 40%;
    padding: 1.2rem 0.7em 0 0.7em;
    display: flex;
    flex-direction: column;
    line-height: 1.4;
    text-align: center;
    word-wrap:break-word; 
    word-break:break-all;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    @media screen and (max-width: 700px) {
      padding: 0.6rem 0.5em 0 0.5em;
    }
  }

  .lens-item-name {
    width: 100%;
    height: 50%
    padding: 10px;
    @media screen and (max-width: 700px) {
      font-size: 0.4em;
    }
  }

  .lens-item-price {
    width: 100%;
    height: 50%;
    padding: 0.63em;
  }
`;

interface BestLenslistItemProps {
  lens: { id: number; name: string; price: number; img: string };
}

function BestLenslistItem({ lens }: BestLenslistItemProps) {
  return (
    <BestLensItemStyle>
      <span className="heart">
        <BsHeartFill color="pink" size={20} />
      </span>
      <Link href="/detail">
        <img src={lens.img} alt="lens-img" className="lens-img" />
      </Link>
      <div className="lens-item-desc">
        <span className="lens-item-name">{lens.name}</span>
        <span className="lens-item-price">{lens.price}원</span>
      </div>
    </BestLensItemStyle>
  );
}

export default BestLenslistItem;
