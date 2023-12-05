import PaginationItemForFilter from "@/components/layout/PaginationItemForFilter";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const PaginationListStyle = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 20px;

  .arr-btn {
    border: none;
    padding: 0 10px;
    font-weight: 700;
    background-color: white;
  }
`;

interface PaginationListProps {
  limit: number;
  page: number;
  blockNum: number;
  listCount: number;
  path: string;
}

function PaginationListForFilter({ limit, page, blockNum, listCount, path }: PaginationListProps) {
  const router = useRouter();
  const listCountArr = Array.from({ length: listCount }, (v, i) => ++i);

  const pageLimit = 3;

  const totalPage: number = Math.ceil(listCount / limit);

  const blockArea: number = blockNum * pageLimit;
  let PArr: number[] = [];
  if (totalPage < blockArea + pageLimit) {
    PArr = listCountArr?.slice(blockArea, totalPage);
  } else {
    PArr = listCountArr?.slice(blockArea, pageLimit + blockArea);
  }

  function firstPage() {
    router.push(`?params=${path}&page=${1}`);
  }

  function lastPage() {
    router.push(`?params=${path}&page=${totalPage}`);
  }

  function prevPage() {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= pageLimit * blockNum) {
    }

    router.push(`?params=${path}&page=${page - 1}`);
  }

  function nextPage() {
    if (page >= totalPage) {
      return;
    }
    if (pageLimit * (blockNum + 1) < page + 1) {
    }

    router.push(`?params=${path}&page=${page + 1}`);
  }

  return (
    <PaginationListStyle>
      <button className="arr-btn" onClick={firstPage} disabled={page === 1}>
        {"<<"}
      </button>
      <button className="arr-btn" onClick={prevPage} disabled={page === 1}>
        {"<"}
      </button>
      {PArr?.map((pageNum: number) => (
        <PaginationItemForFilter key={pageNum} pageNum={pageNum} path={path} state={page === pageNum ? "on" : ""} />
      ))}
      <button className="arr-btn" onClick={nextPage} disabled={page === totalPage || PArr.length === 0}>
        {">"}
      </button>
      <button className="arr-btn" onClick={lastPage} disabled={page === totalPage || PArr.length === 0}>
        {">>"}
      </button>
    </PaginationListStyle>
  );
}

export default PaginationListForFilter;
