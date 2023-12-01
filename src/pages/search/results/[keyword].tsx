import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensResultListContainer from "@/containers/global/LensResultListContainer";
import SearchApi from "@/interfaces/searchApi";
import { IBestLensItem } from "@/types/lens/lens";
import styled from "styled-components";
import PaginationList from "@/containers/global/PaginationList";

const SearchResultPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface SearchParamsProps {
  params: {
    keyword: string;
  };
}

interface SearchResultPageProps {
  listCount: number;
  keyword: string;
}

function SearchResultPage({ listCount, keyword }: SearchResultPageProps) {
  const router = useRouter();
  // const { keyword } = router.query;
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  // const [listCount, setListCount] = useState<number>(0);
  const [blockNum, setBlockNum] = useState(0);
  const [lensItemsByKeyword, setLensItemsByKeyword] = useState<IBestLensItem[]>([]);

  useEffect(() => {
    (async () => {
      const searchApi = new SearchApi();
      const lensItems = await searchApi.getLensitemListByKeywordByOffset(String(keyword), page, limit);
      setLensItemsByKeyword(lensItems);
    })();
  }, [keyword, page, limit]);

  // useEffect(() => {
  //   (async () => {
  //     const searchApi = new SearchApi();
  //     const resultsCount = await searchApi.getLensAllCountByKeyword(String(keyword));
  //     setListCount(resultsCount);
  //   })();
  // }, [keyword]);

  return (
    <>
      <BackHomeNavBar title="result" />
      <SearchResultPageStyle>
        <LensResultListContainer lensList={lensItemsByKeyword} listCount={listCount} />
        <PaginationList
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          listCount={listCount}
        />
      </SearchResultPageStyle>
    </>
  );
}

export async function getServerSideProps({ params }: SearchParamsProps) {
  const { keyword } = params;
  console.log("-------keyword: ", keyword);
  const searchApi = new SearchApi();
  const listCount = await searchApi.getLensAllCountByKeyword(keyword);

  return {
    props: {
      listCount,
      keyword,
    },
  };
}

export default SearchResultPage;
