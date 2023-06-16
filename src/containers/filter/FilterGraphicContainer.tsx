import FilterGraphicItem from "@/components/filter/FilterGraphicItem";
import { IMinMax, IMinMaxText, IisPositiveCondi } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const GraphicContainerStyle = styled.div`
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

interface FilterGraphicContainerProps {
  setGraphics: Dispatch<SetStateAction<IisPositiveCondi[]>>;
  filterSorting: (
    someFilterList: IMinMax[],
    setFilters: Dispatch<SetStateAction<IisPositiveCondi[]>>,
    someFilterStates: IMinMaxText[],
    minValue: number,
    maxValue: number
  ) => void;
}

function FilterGraphicContainer({ setGraphics, filterSorting }: FilterGraphicContainerProps) {
  const [graphicStates, setGraphicStates] = useState<IMinMaxText[]>([
    { id: 1, text: "11.9 ~ 13.0", min: 11.9, max: 13.0 },
    { id: 2, text: "13.1 ~ 13.6", min: 13.1, max: 13.6 },
    { id: 3, text: "13.7 ~", min: 13.7, max: 99.9 },
  ]);
  const [graphicFilterList, setGraphicFilterList] = useState<IMinMax[]>([]);

  useEffect(() => {
    filterSorting(graphicFilterList, setGraphics, graphicStates, 13.1, 13.6);
  }, [setGraphics, graphicFilterList, graphicStates]);

  function clickAll() {
    if (graphicFilterList.length === graphicStates.length) {
      setGraphicFilterList([]);
    } else {
      setGraphicFilterList(graphicStates.map((g) => ({ id: g.id, min: g.min, max: g.max })));
    }
  }

  return (
    <GraphicContainerStyle>
      <div className="title-headerbox">
        <h3>직경</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {graphicStates.map((graphic) => (
          <FilterGraphicItem
            key={graphic.id}
            graphic={graphic}
            graphicFilterList={graphicFilterList}
            setGraphicFilterList={setGraphicFilterList}
          />
        ))}
      </ul>
    </GraphicContainerStyle>
  );
}

export default FilterGraphicContainer;
