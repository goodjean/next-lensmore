import FilterPeriodItem from "@/components/filter/FilterPeriodItem";
import { IDays } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const PeriodContainerStyle = styled.div`
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

interface FilterPeriodContainerProps {
  setPeriods: Dispatch<SetStateAction<string[]>>;
}

function FilterPeriodContainer({ setPeriods }: FilterPeriodContainerProps) {
  const [periodStates, setPeriodStates] = useState<IDays[]>([
    { id: 1, en: "oneday", ko: "원데이" },
    { id: 2, en: "weekly-1month", ko: "2주/한달착용" },
    { id: 3, en: "long-term", ko: "장기착용" },
  ]);
  const [periodFilterList, setPeriodFilterList] = useState<string[]>([]);

  useEffect(() => {
    if (periodFilterList.length === 0) {
      setPeriods(periodStates.map((p) => p.en));
    } else {
      setPeriods(periodFilterList);
    }
  }, [setPeriods, periodFilterList, periodStates]);

  function clickAll() {
    if (periodFilterList.length === periodStates.length) {
      setPeriodFilterList([]);
    } else {
      setPeriodFilterList(periodStates.map((p) => p.en));
      setPeriods(periodStates.map((p) => p.en));
    }
  }

  return (
    <PeriodContainerStyle>
      <div className="title-headerbox">
        <h3>사용구분</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {periodStates.map((period) => (
          <FilterPeriodItem
            key={period.id}
            period={period}
            periodFilterList={periodFilterList}
            setPeriodFilterList={setPeriodFilterList}
          />
        ))}
      </ul>
    </PeriodContainerStyle>
  );
}

export default FilterPeriodContainer;
