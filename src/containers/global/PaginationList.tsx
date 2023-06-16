import PaginationItem from "@/components/layout/PaginationItem";
import React, { Dispatch, SetStateAction } from "react";
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
  setPage: Dispatch<SetStateAction<number>>;
  blockNum: number;
  setBlockNum: Dispatch<SetStateAction<number>>;
  listCount: number;
}

function PaginationList({ limit, page, setPage, blockNum, setBlockNum, listCount }: PaginationListProps) {
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
    setPage(1);
    setBlockNum(0);
  }

  function lastPage() {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  }

  function prevPage() {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
  }

  function nextPage() {
    if (page >= totalPage) {
      return;
    }
    if (pageLimit * (blockNum + 1) < page + 1) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
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
        <PaginationItem key={pageNum} pageNum={pageNum} setPage={setPage} state={page === pageNum ? "on" : ""} />
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

export default PaginationList;
