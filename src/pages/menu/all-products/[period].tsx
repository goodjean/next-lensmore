import React, { useEffect, useState } from "react";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import PaginationList from "@/containers/global/PaginationList";
import { IBestLensItem } from "@/types/lens/lens";
import { useRouter } from "next/router";
import styled from "styled-components";
import LensApi from "@/interfaces/lensApi";

const LensByPeriodPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function LensByPeriodPage() {
  const router = useRouter();
  const { period } = router.query;
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const [listCount, setListCount] = useState<number>(0);
  const [blockNum, setBlockNum] = useState(0);
  const [lensList, setLensList] = useState<IBestLensItem[]>([]);

  if (!period || typeof period !== "string") {
    throw "error";
  }

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenses = await lensApi.getLenslistByPeriodByOffset(period, page, limit);
      setLensList(lenses);
    })();
  }, [period, page, limit]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenses = await lensApi.getLenslistByPeriod(period);
      console.log(lenses);
      setListCount(lenses);
    })();
  }, [period]);

  return (
    <>
      <BackHomeNavBar title={period} />
      <LensByPeriodPageStyle>
        <LensResultListContainer lensList={lensList} listCount={listCount} />
        <PaginationList
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          listCount={listCount}
        />
      </LensByPeriodPageStyle>
    </>
  );
}

export default LensByPeriodPage;
