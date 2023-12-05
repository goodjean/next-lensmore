import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import FilterBrandContainer from "@/containers/filter/FilterBrandContainer";
import FilterColorContainer from "@/containers/filter/FilterColorContainer";
import FilterGraphicContainer from "@/containers/filter/FilterGraphicContainer";
import FilterPeriodContainer from "@/containers/filter/FilterPeriodContainer";
import FilterPriceContainer from "@/containers/filter/FilterPriceContainer";
import { IMinMax, IMinMaxText, IisPositiveCondi } from "@/types/lens/lens";
import { useRouter, NextRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

const FilterPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 32px 60px;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;

  button {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 12px;
    background-color: #000;
    padding: 7px 6px 6px 6px;
    margin-top: 60px;
  }
`;

function FilterPage() {
  const router = useRouter();
  const [periods, setPeriods] = useState<string[]>([]);
  const [colors, setColors] = useState<number[]>([]);
  const [graphics, setGraphics] = useState<IisPositiveCondi[]>([]); // type
  const [prices, setPrices] = useState<IisPositiveCondi[]>([]); // type
  const [brands, setBrands] = useState<number[]>([]);

  const queryData = [periods, colors, graphics, prices, brands];
  const stateString = JSON.stringify(queryData);

  function filter() {
    router.push(
      { pathname: `/filter/results?params=${stateString}&page=1` },
      `/filter/results?params=${stateString}&page=1`
    );
  }

  function filterSorting(
    someFilterList: IMinMax[],
    setFilters: Dispatch<SetStateAction<IisPositiveCondi[]>>,
    someFilterStates: IMinMaxText[],
    minValue: number,
    maxValue: number
  ) {
    const idArr = someFilterList.map((list) => list.id);
    if (idArr.includes(1 && 3) && idArr.length === 2 && !idArr.includes(2)) {
      setFilters([{ min: minValue, max: maxValue, isPositive: false }]);
      console.log("hi");
    } else if (someFilterList.length === 0) {
      setFilters([{ min: someFilterStates[0].min, max: someFilterStates[2].max, isPositive: true }]);
    } else {
      const minArr = someFilterList.map((list) => list.min);
      const maxArr = someFilterList.map((list) => list.max);
      minArr.sort(function (a, b) {
        return a - b;
      });
      maxArr.sort(function (a, b) {
        return b - a;
      });
      setFilters([{ min: minArr[0], max: maxArr[0], isPositive: true }]);
    }
  }

  return (
    <>
      <BackHomeNavBar title="Filter" />
      <FilterPageStyle>
        <FilterPeriodContainer setPeriods={setPeriods} />
        <FilterColorContainer setColors={setColors} />
        <FilterGraphicContainer setGraphics={setGraphics} filterSorting={filterSorting} />
        <FilterPriceContainer setPrices={setPrices} filterSorting={filterSorting} />
        <FilterBrandContainer setBrands={setBrands} />
        <button onClick={filter}>검색</button>
      </FilterPageStyle>
    </>
  );
}

export default FilterPage;
