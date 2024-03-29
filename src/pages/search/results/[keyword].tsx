import React from "react";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import SearchApi from "@/interfaces/searchApi";
import { IBestLensItem } from "@/types/lens/lens";
import styled from "styled-components";
import PaginationList from "@/containers/global/PaginationList";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const SearchResultPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface SearchResultPageProps {
  lensItemsByKeyword: IBestLensItem[];
  listCount: number;
  keyword: string;
  pageNum: number;
  path: string;
  blockNum: number;
  wishlist: IBestLensItem[];
}

function SearchResultPage({
  lensItemsByKeyword,
  listCount,
  keyword,
  pageNum,
  path,
  blockNum,
  wishlist,
}: SearchResultPageProps) {
  return (
    <>
      <BackHomeNavBar title="result" />
      <SearchResultPageStyle>
        <LensResultListContainer lensList={lensItemsByKeyword} listCount={listCount} wishlist={wishlist} />
        <PaginationList
          limit={9}
          page={pageNum}
          blockNum={blockNum}
          listCount={listCount}
          keyword={String(keyword)}
          path={path}
        />
      </SearchResultPageStyle>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { keyword, page } = context.query;
  const session = await getSession(context);
  const email = session?.user?.email;
  const emailStr = String(email);
  const fullUrl = String(context.req.url);
  const idx = fullUrl.indexOf("%");
  const path = fullUrl.substring(0, idx);
  const pageStr = String(page);
  const pageNum = parseInt(pageStr, 10) || 1;
  const blockNum = Math.floor((pageNum - 1) / 3);

  const searchApi = new SearchApi();
  const lensItemsAndListCount = await searchApi.getListCountAndLensitemListByKeywordByOffset(
    String(keyword),
    pageNum,
    9
  );
  const wishlist = await searchApi.getWishListForSearchPage(emailStr);
  const lensItemsByKeyword = lensItemsAndListCount.lensItems;
  const listCount = lensItemsAndListCount.totalCount;

  return {
    props: {
      lensItemsByKeyword,
      listCount,
      keyword,
      pageNum,
      path,
      blockNum,
      wishlist,
    },
  };
}

export default SearchResultPage;
