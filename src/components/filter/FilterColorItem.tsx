import { IColors } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const ColorItemStyle = styled.li`
  width: 13%;
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

interface FilterColorItemProps {
  color: IColors;
  colorFilterList: number[];
  setColorFilterList: Dispatch<SetStateAction<number[]>>;
}

function FilterColorItem({ color, colorFilterList, setColorFilterList }: FilterColorItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const found = colorFilterList.find((c) => c === color.id);
    if (!found) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [colorFilterList, color.id]);

  function setColor() {
    const found = colorFilterList.find((c) => c === color.id);

    if (found) {
      const colorIds = colorFilterList.filter((c) => c !== color.id);
      setColorFilterList(colorIds);
      setIsActive(false);
    } else {
      setColorFilterList((prev) => [...prev, color.id]);
      setIsActive(true);
    }
  }

  return (
    <ColorItemStyle onClick={setColor}>
      {!isActive ? <div className="none-active">{color.color}</div> : <div className="active">{color.color}</div>}
    </ColorItemStyle>
  );
}

export default FilterColorItem;
