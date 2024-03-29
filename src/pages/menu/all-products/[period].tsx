import React from "react";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import PaginationList from "@/containers/global/PaginationList";
import { IBestLensItem } from "@/types/lens/lens";
import styled from "styled-components";
import LensApi from "@/interfaces/lensApi";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

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
  wishlist: IBestLensItem[];
}

function LensByPeriodPage({
  lensItemsByPeriod,
  listCount,
  period,
  pageNum,
  path,
  blockNum,
  wishlist,
}: LensByPeriodPageProps) {
  return (
    <>
      <BackHomeNavBar title={period} />
      <LensByPeriodPageStyle>
        <LensResultListContainer lensList={lensItemsByPeriod} listCount={listCount} wishlist={wishlist} />
        <PaginationList
          limit={30}
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
  const session = await getSession(context);
  const email = session?.user?.email;
  const emailStr = String(email);
  const fullUrl = String(context.req.url);
  const idx = fullUrl.indexOf("%");
  const path = fullUrl.substring(0, idx);
  const pageStr = String(page);
  const pageNum = parseInt(pageStr, 10) || 1;
  const blockNum = Math.floor((pageNum - 1) / 3);

  const lensApi = new LensApi();
  const ListCountAndLensItems = await lensApi.getListCountAndLenslistByPeriodByOffset(String(period), pageNum, 30);
  const wishlist = await lensApi.getWishListForPeriodPage(emailStr);
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
      wishlist,
    },
  };
}

export default LensByPeriodPage;
