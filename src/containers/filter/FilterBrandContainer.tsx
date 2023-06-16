import FilterBrandItem from "@/components/filter/FilterBrandItem";
import { IBrands } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const BrandContainerStyle = styled.div`
  width: 100%;
  height: 20%;
  // background-color: yellow;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  .title-headerbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 20px;

    h3 {
      width: 50%;
      height: 100%;
      padding-top: 10px;
    }

    span {
      width: 34%;
      padding-top: 10px;
      text-align: end;
      cursor: pointer;
    }
  }
`;

interface FilterBrandContainerProps {
  setBrands: Dispatch<SetStateAction<number[]>>;
}

function FilterBrandContainer({ setBrands }: FilterBrandContainerProps) {
  const [brandStates, setBrandStates] = useState<IBrands[]>([
    { id: 1, en_name: "olens", ko_name: "오렌즈", url: "https://o-lens.com/main/index", thumbnail: "" },
    { id: 2, en_name: "lensme", ko_name: "렌즈미", url: "https://www.lens-me.com/", thumbnail: "" },
    { id: 3, en_name: "lenstown", ko_name: "렌즈타운", url: "https://lenstown.co.kr/", thumbnail: "" },
  ]);
  const [brandFilterList, setBrandFilterList] = useState<number[]>([]);

  useEffect(() => {
    if (brandFilterList.length === 0) {
      setBrands(brandStates.map((brand) => brand.id));
    } else {
      setBrands(brandFilterList);
    }
  }, [setBrands, brandFilterList, brandStates]);

  function clickAll() {
    if (brandFilterList.length === brandStates.length) {
      setBrandFilterList([]);
    } else {
      setBrandFilterList(brandStates.map((b) => b.id));
      setBrands(brandStates.map((b) => b.id));
    }
  }

  return (
    <BrandContainerStyle>
      <div className="title-headerbox">
        <h3>브랜드</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {brandStates.map((brand) => (
          <FilterBrandItem
            key={brand.id}
            brand={brand}
            brandFilterList={brandFilterList}
            setBrandFilterList={setBrandFilterList}
          />
        ))}
      </ul>
    </BrandContainerStyle>
  );
}

export default FilterBrandContainer;
