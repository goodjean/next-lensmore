import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const MainDaysBarStyle = styled.li`
  color: #aeaeae;
  font-size: 1.065rem;
  cursor: pointer;
  padding: 10px 10px 13px 10px;
  @media screen and (max-width: 700px) {
    font-size: 0.85rem;
  }

  .on {
    color: black;
    font-weight: bold;
  }

  .on::after {
    content: "💕";
  }
`;

interface MainDaysBarProps {
  day: { id: number; period: string; en: string };
  state: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}

function MainDaysBar({ day, state, setPeriod }: MainDaysBarProps) {
  return (
    <MainDaysBarStyle>
      <div className={state} onClick={() => setPeriod(day.en)}>
        {day.period}
      </div>
    </MainDaysBarStyle>
  );
}

export default MainDaysBar;
