import { IBrands } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const BrandItemStyle = styled.li`
  width: 30%;
  // background-color: green;

  .none-active {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    color: #aeaeae;
    font-weight: bold;
    cursor: pointer;
    padding: 13px 10px 10px 10px;
  }

  .active {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: black;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 8px;
    cursor: pointer;
    padding: 13px 10px 10px 10px;
  }
`;

interface BrandItemProps {
  brand: IBrands;
  brandFilterList: number[];
  setBrandFilterList: Dispatch<SetStateAction<number[]>>;
}

function FilterBrandItem({ brand, brandFilterList, setBrandFilterList }: BrandItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const found = brandFilterList.find((b) => b === brand.id);
    if (!found) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [brandFilterList, brand.id]);

  function setBrand() {
    const found = brandFilterList.find((b) => b === brand.id);

    if (found) {
      const brandIds = brandFilterList.filter((b) => b !== brand.id);
      setBrandFilterList(brandIds);
      setIsActive(false);
    } else {
      setBrandFilterList((prev) => [...prev, brand.id]);
      setIsActive(true);
    }
  }

  return (
    <BrandItemStyle onClick={setBrand}>
      {!isActive ? <div className="none-active">{brand.ko_name}</div> : <div className="active">{brand.ko_name}</div>}
    </BrandItemStyle>
  );
}

export default FilterBrandItem;
