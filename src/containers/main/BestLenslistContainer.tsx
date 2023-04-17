import BestLenslistItem from "@/components/main/BestLenslistItem";
import React, { useState } from "react";
import styled from "styled-components";

const BestLenslistStyle = styled.article`
  width: 100%;
  height: 100%;
  padding: 30px 26px;
  display: flex;
  flex-direction: column;

  h3 {
    width: 100%;
    height: 30%;
    padding: 14px 0px;
    font-size: 1.18rem;
    @media screen and (max-width: 700px) {
      font-size: 0.9rem;
    }
  }

  .brand-best-list {
    width: 100%;
    height: 70%;
    margin-top: 9px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    // gap: 20px;
    @media screen and (max-width: 700px) {
      margin: 0.5rem 0 1.3rem 0;
    }
  }
`;

interface BestLenslistContainerProps {
  period: string;
  brand: { id: number; brand: string };
}

function BestLenslistContainer({ period, brand }: BestLenslistContainerProps) {
  const [lenslist, setLenslist] = useState([
    {
      id: 1,
      name: "비비링 오렌즈",
      price: 20000,
      img: "https://file.o-lens.com/prd_img/20627/62637199-63ac-4773-8281-0171d432b5d7%ED%94%84%EB%A0%8C%EC%B9%98%EC%83%A4%EC%9D%B8_sum_la.jpg?w=284",
    },
    {
      id: 2,
      name: "쀼쀼링 오렌즈",
      price: 20000,
      img: "https://file.o-lens.com/prd_img/20627/62637199-63ac-4773-8281-0171d432b5d7%ED%94%84%EB%A0%8C%EC%B9%98%EC%83%A4%EC%9D%B8_sum_la.jpg?w=284",
    },
    {
      id: 3,
      name: "보보링 오렌즈",
      price: 20000,
      img: "https://file.o-lens.com/prd_img/20627/62637199-63ac-4773-8281-0171d432b5d7%ED%94%84%EB%A0%8C%EC%B9%98%EC%83%A4%EC%9D%B8_sum_la.jpg?w=284",
    },
  ]);
  return (
    <BestLenslistStyle>
      <h3>{`${brand.brand} 베스트`}</h3>
      <div className="brand-best-list">
        {lenslist?.map((lens) => (
          <BestLenslistItem key={lens.id} lens={lens} />
        ))}
      </div>
    </BestLenslistStyle>
  );
}

export default BestLenslistContainer;
