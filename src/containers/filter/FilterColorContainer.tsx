import FilterColorItem from "@/components/filter/FilterColorItem";
import { IColors } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const ColorContainerStyle = styled.div`
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

interface FilterColorContainerProps {
  setColors: Dispatch<SetStateAction<number[]>>;
}

function FilterColorContainer({ setColors }: FilterColorContainerProps) {
  const [colorStates, setColorStates] = useState<IColors[]>([
    { id: 1, color: "브라운" },
    { id: 2, color: "블랙" },
    { id: 3, color: "그레이" },
    { id: 4, color: "초코" },
    { id: 5, color: "핑크" },
    { id: 6, color: "블루" },
    { id: 7, color: "그린" },
  ]); // DB DATA
  const [colorFilterList, setColorFilterList] = useState<number[]>([]); //임시저장소

  useEffect(() => {
    if (colorFilterList.length === 0) {
      setColors(colorStates.map((color) => color.id));
    } else {
      setColors(colorFilterList);
    }
  }, [setColors, colorFilterList, colorStates]);

  function clickAll() {
    if (colorFilterList.length === colorStates.length) {
      setColorFilterList([]);
    } else {
      setColorFilterList(colorStates.map((c) => c.id));
      setColors(colorStates.map((c) => c.id));
    }
  }

  return (
    <ColorContainerStyle>
      <div className="title-headerbox">
        <h3>컬러</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {colorStates.map((color) => (
          <FilterColorItem
            key={color.id}
            color={color}
            colorFilterList={colorFilterList}
            setColorFilterList={setColorFilterList}
          />
        ))}
      </ul>
    </ColorContainerStyle>
  );
}

export default FilterColorContainer;
