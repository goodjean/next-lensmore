import { IDays } from "@/types/lens/lens";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const MenuLensCateItemStyle = styled.li`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  cursor: pointer;

  .oneday:hover {
    font-weight: bold;
  }

  .weekly-1month:hover {
    font-weight: bold;
  }

  .long-term:hover {
    font-weight: bold;
  }
`;

interface GatherdProductCategoryItemProps {
  day: IDays;
}

function GatherdProductCategoryItem({ day }: GatherdProductCategoryItemProps) {
  const router = useRouter();

  function onClick() {
    router.push(`/menu/all-products/${day.en}`);
  }

  return (
    <MenuLensCateItemStyle onClick={onClick}>
      <Link className={day.en} href={`/menu/all-products/${day.en}`}>
        {day.ko}
      </Link>
    </MenuLensCateItemStyle>
  );
}

export default GatherdProductCategoryItem;
