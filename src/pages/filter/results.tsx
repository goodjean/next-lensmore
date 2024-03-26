import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import PaginationListForFilter from "@/containers/global/PaginationListForFilter";
import FilterApi from "@/interfaces/filterApi";
import { IBestLensItem } from "@/types/lens/lens";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
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
  wishlist: IBestLensItem[];
}

function ResultsPage({ pageNum, blockNum, listCount, lensItemsByKeyword, path, wishlist }: ResultsPageProps) {
  return (
    <>
      <BackHomeNavBar title="result" />
      <FilterResultPageStyle>
        <LensResultListContainer lensList={lensItemsByKeyword} listCount={listCount} wishlist={wishlist} />
        <PaginationListForFilter limit={9} page={pageNum} blockNum={blockNum} listCount={listCount} path={path} />
      </FilterResultPageStyle>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, page } = context.query;
  const session = await getSession(context);
  const email = session?.user?.email;
  const emailStr = String(email);
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
  const wishlist = await filterApi.getWishListForFilterPage(emailStr);

  const lensItemsByKeyword = lensItemsAndListCount.lensItems;
  const listCount = lensItemsAndListCount.totalCount;

  return {
    props: {
      pageNum,
      blockNum,
      listCount,
      lensItemsByKeyword,
      path,
      wishlist,
    },
  };
}

export default ResultsPage;
