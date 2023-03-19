import MainDaysBar from "@/components/main/MainDaysBar";
import Link from "next/link";
import { FiFilter, FiSearch, FiMenu } from "react-icons/fi";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

const MainHeaderContainerStyle = styled.header`
  background-color: white;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  border-bottom: 1px solid lightgray;

  h1 {
    @import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
    font-family: "PT Sans", sans-serif;
    color: #505050;
    font-weight: normal;
    font-size: 2.2rem;
    padding-left: 8px;
    @media screen and (max-width: 700px) {
      font-size: 1.6rem;
    }
  }

  .main-header-upper {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 20px;
    flex-wrap: wrap;
  }

  .main-feature {
    display: flex;
  }

  nav {
    padding: 0.5rem;
    @media screen and (max-width: 700px) {
      padding: 0.18rem;
    }
  }

  .main-header-down {
    width: 100%;
    height: 40%;
  }

  .days-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    list-style: none;
    flex-wrap: wrap;
  }
`;

interface MainHeaderContainerProps {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}

function MainHeaderContainer({ period, setPeriod }: MainHeaderContainerProps) {
  const [days, setDays] = useState([
    { id: 1, period: "원데이", en: "oneday" },
    { id: 2, period: "2주/한달착용", en: "weekly-monthly" },
    { id: 3, period: "장기착용", en: "long-term" },
  ]);

  return (
    <MainHeaderContainerStyle>
      <div className="main-header-upper">
        <div className="main-logo">
          <Link href="/">
            <h1>LensMore</h1>
          </Link>
        </div>
        <div className="main-feature">
          <nav>
            <Link href="/filter">
              <FiFilter size={28} color="#6e6e6e" />
            </Link>
          </nav>
          <nav>
            <Link href="/search">
              <FiSearch size={28} color="#6e6e6e" />
            </Link>
          </nav>
          <nav>
            <Link href="/menu">
              <FiMenu size={28} color="#6e6e6e" />
            </Link>
          </nav>
        </div>
      </div>
      <div className="main-header-down">
        <ul className="days-list">
          {days.map((day) => (
            <MainDaysBar key={day.id} day={day} state={period === day.en ? "on" : ""} setPeriod={setPeriod} />
          ))}
        </ul>
      </div>
    </MainHeaderContainerStyle>
  );
}

export default MainHeaderContainer;
