import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const PaginationItemStyle = styled.div`
  width: 10%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  color: #b4b4b4;

  &:hover {
    background-color: #f5d3dd;
    cursor: pointer;
    transform: translateY(-2px);
  }

  .on {
    width: auto;
    color: black;
    font-weight: bold;
    opacity: 1;
    border-radius: 15px;
  }
`;

interface PaginationItemProps {
  pageNum: number;
  setPage: Dispatch<SetStateAction<number>>;
  state: string;
}

function PaginationItem({ pageNum, setPage, state }: PaginationItemProps) {
  return (
    <PaginationItemStyle onClick={() => setPage(pageNum)}>
      <span className={state}>{pageNum}</span>
    </PaginationItemStyle>
  );
}

export default PaginationItem;
