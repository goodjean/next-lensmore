import React from "react";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import PaginationList from "@/containers/global/PaginationList";
import { IBestLensItem } from "@/types/lens/lens";
import styled from "styled-components";
import LensApi from "@/interfaces/lensApi";
import { GetServerSidePropsContext } from "next";

const LensByPeriodPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
`;

interface LensByPeriodPageProps {
  lensItemsByPeriod: IBestLensItem[];
  listCount: number;
  period: string;
  pageNum: number;
  path: string;
  blockNum: number;
}

function LensByPeriodPage({ lensItemsByPeriod, listCount, period, pageNum, path, blockNum }: LensByPeriodPageProps) {
  return (
    <>
      <BackHomeNavBar title={period} />
      <LensByPeriodPageStyle>
        <LensResultListContainer lensList={lensItemsByPeriod} listCount={listCount} />
        <PaginationList
          limit={100}
          page={pageNum}
          blockNum={blockNum}
          listCount={listCount}
          keyword={String(period)}
          path={path}
        />
      </LensByPeriodPageStyle>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { period, page } = context.query;
  const fullUrl = String(context.req.url);
  const idx = fullUrl.indexOf("%");
  const path = fullUrl.substring(0, idx);
  const pageStr = String(page);
  const pageNum = parseInt(pageStr, 10) || 1;
  const blockNum = Math.floor((pageNum - 1) / 3);

  const lensApi = new LensApi();
  const ListCountAndLensItems = await lensApi.getListCountAndLenslistByPeriodByOffset(String(period), pageNum, 100);
  const lensItemsByPeriod = ListCountAndLensItems.lensItems;
  const listCount = ListCountAndLensItems.totalCount;

  return {
    props: {
      lensItemsByPeriod,
      listCount,
      period,
      pageNum,
      path,
      blockNum,
    },
  };
}

export default LensByPeriodPage;
