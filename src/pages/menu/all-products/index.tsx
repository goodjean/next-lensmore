import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import GatherdProductCategoryItem from "@/components/menu/GatherdProductCategoryItem";
import LensApi from "@/interfaces/lensApi";
import { IDays } from "@/types/lens/lens";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const GatherProductsPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }

  .color-lens {
    width: 100%;
    text-align: center;
    padding: 14px;
    border-bottom: 1px solid #e1e1e1;
  }

  .period-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: space-between;
  }
`;

function GatherProductsPage() {
  const [days, setDays] = useState<IDays[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const dayList = await lensApi.getLensDayList();
      setDays(dayList);
    })();
  }, []);

  return (
    <>
      <BackHomeNavBar title="Gather" />
      <GatherProductsPageStyle>
        <div className="container">
          <h4 className="color-lens">렌즈구분</h4>
          <ul className="period-container">
            {days.map((day) => (
              <GatherdProductCategoryItem key={day.id} day={day} />
            ))}
          </ul>
        </div>
      </GatherProductsPageStyle>
    </>
  );
}

export default GatherProductsPage;
