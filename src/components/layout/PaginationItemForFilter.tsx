import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const PaginationItemForFilterStyle = styled.div`
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
  path: string;
  state: string;
}

function PaginationItemForFilter({ pageNum, path, state }: PaginationItemProps) {
  const router = useRouter();
  return (
    <PaginationItemForFilterStyle onClick={() => router.push(`?params=${path}&page=${pageNum}`)}>
      <span className={state}>{pageNum}</span>
    </PaginationItemForFilterStyle>
  );
}

export default PaginationItemForFilter;
