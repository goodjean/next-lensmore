import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import PaginationList from "@/containers/global/PaginationList";
import FilterApi from "@/interfaces/filterApi";
import { IBestLensItem, IisPositiveCondi } from "@/types/lens/lens";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FilterResultPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function ResultsPage() {
  const router = useRouter();
  const { params } = router.query;
  const state = JSON.parse(JSON.parse(JSON.stringify(params)) || "{}"); // 임시방편

  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const [listCount, setListCount] = useState<number>(0);
  const [blockNum, setBlockNum] = useState(0);
  const [filterLenslist, setFilterLenslist] = useState<IBestLensItem[]>([]);

  const period: string[] = state[0];
  const color: number[] = state[1];
  const graphic: IisPositiveCondi[] = state[2];
  const price: IisPositiveCondi[] = state[3];
  const brand: number[] = state[4];

  useEffect(() => {
    (async () => {
      const filterApi = new FilterApi();
      const lensList = await filterApi.getFilteredLensListByOffset(period, color, graphic, price, brand, page, limit);
      setFilterLenslist(lensList);
    })();
  }, [period, color, graphic, price, brand, page, limit]);

  useEffect(() => {
    (async () => {
      const filterApi = new FilterApi();
      const lensList = await filterApi.getAllFilteredLensList(period, color, graphic, price, brand);
      setListCount(lensList.length);
    })();
  }, [period, color, graphic, price, brand]);

  return (
    <>
      <BackHomeNavBar title="result" />
      <FilterResultPageStyle>
        <LensResultListContainer lensList={filterLenslist} listCount={listCount} />
        <PaginationList
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          listCount={listCount}
        />
      </FilterResultPageStyle>
    </>
  );
}

export default ResultsPage;
