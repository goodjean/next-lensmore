import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import PaginationList from "@/containers/global/PaginationList";
import PaginationListForFilter from "@/containers/global/PaginationListForFilter";
import FilterApi from "@/interfaces/filterApi";
import { IBestLensItem, IisPositiveCondi } from "@/types/lens/lens";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FilterResultPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface ResultsPageProps {
  pageNum: number;
  blockNum: number;
  listCount: number;
  lensItemsByKeyword: IBestLensItem[];
  path: string;
}

function ResultsPage({ pageNum, blockNum, listCount, lensItemsByKeyword, path }: ResultsPageProps) {
  return (
    <>
      <BackHomeNavBar title="result" />
      <FilterResultPageStyle>
        <LensResultListContainer lensList={lensItemsByKeyword} listCount={listCount} />
        <PaginationListForFilter limit={9} page={pageNum} blockNum={blockNum} listCount={listCount} path={path} />
      </FilterResultPageStyle>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, page } = context.query;
  const path = context.query.params;
  const state = JSON.parse(String(params));
  const [period, color, graphic, price, brand] = state;
  const fullUrl = String(context.req.url);
  const idx = fullUrl.indexOf("%");
  const path2 = fullUrl.substring(0, idx);
  const pageStr = String(page);
  const pageNum = parseInt(pageStr, 10) || 1;
  const blockNum = Math.floor((pageNum - 1) / 3);

  const filterApi = new FilterApi();
  const lensItemsAndListCount = await filterApi.getListCountAndFilteredLensListByOffset(
    period,
    color,
    graphic,
    price,
    brand,
    pageNum,
    9
  );

  const lensItemsByKeyword = lensItemsAndListCount.lensItems;
  const listCount = lensItemsAndListCount.totalCount;

  return {
    props: {
      pageNum,
      blockNum,
      listCount,
      lensItemsByKeyword,
      path,
    },
  };
}

export default ResultsPage;
