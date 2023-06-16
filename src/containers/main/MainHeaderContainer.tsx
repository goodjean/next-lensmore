import MainDaysBar from "@/components/main/MainDaysBar";
import Link from "next/link";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import LensApi from "@/interfaces/lensApi";
import { IDays } from "@/types/lens/lens";

const MainHeaderContainerStyle = styled.header`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #e8e8e8;
  z-index: 1000;
  // padding-top: 10px;

  h1 {
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;
    color: #505050;
    font-weight: normal;
    font-size: 1.95rem;
    padding-left: 8px;
    margin: 0.57em 0px 18.5px 0;
  }

  .main-header-upper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1px 18px;
    flex-wrap: wrap;
  }

  .main-feature {
    display: flex;
  }

  nav {
    padding: 0.3rem 0 0.3rem 0.3rem;

    .link-icon {
      padding: 0 7px;
    }
  }

  .main-header-down {
    width: 100%;
  }

  .days-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    list-style: none;
    flex-wrap: wrap;
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;
  }
`;

interface MainHeaderContainerProps {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}

function MainHeaderContainer({ period, setPeriod }: MainHeaderContainerProps) {
  const [days, setDays] = useState<IDays[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const dayList = await lensApi.getLensDayList();
      setDays(dayList);
    })();
  }, []);

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
            <Link href="/filter" className="link-icon">
              <IoFilterOutline size={29} color="#6e6e6e" />
            </Link>
            <Link href="/search" className="link-icon">
              <IoSearchOutline size={29} color="#6e6e6e" />
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
