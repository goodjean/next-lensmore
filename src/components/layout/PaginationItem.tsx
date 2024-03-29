import { useRouter } from "next/router";
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
  keyword: string;
  path: string;
  state: string;
}

function PaginationItem({ pageNum, keyword, path, state }: PaginationItemProps) {
  const router = useRouter();
  return (
    <PaginationItemStyle onClick={() => router.push(`${keyword}?page=${pageNum}`)}>
      <span className={state}>{pageNum}</span>
    </PaginationItemStyle>
  );
}

export default PaginationItem;
