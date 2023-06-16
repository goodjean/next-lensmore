import { IDays } from "@/types/lens/lens";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const MainDaysBarStyle = styled.li`
  width: 30%;
  color: #aeaeae;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 10px 10px 17px 10px;

  .on {
    color: black;
    font-weight: bold;
  }

  .on::after {
    content: "💕";
  }
`;

interface MainDaysBarProps {
  day: IDays;
  state: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}

function MainDaysBar({ day, state, setPeriod }: MainDaysBarProps) {
  return (
    <MainDaysBarStyle>
      <div className={state} onClick={() => setPeriod(day.en)}>
        {day.ko}
      </div>
    </MainDaysBarStyle>
  );
}

export default MainDaysBar;
