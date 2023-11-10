import SearchNavBar from "@/components/search/SearchNavBar";
import HotSearchKeywords from "@/containers/search/HotSearchKeywords";
import React from "react";
import styled from "styled-components";

const SearchPageStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;

  .hot-keyword {
    font-size: 16px;
    font-weight: 800;
    padding: 25px 32px 16px;
    border-bottom: 2px solid #f6f6f6;
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;
  }
`;

function SearchPage() {
  return (
    <>
      <SearchNavBar />
      <SearchPageStyle>
        <div className="hot-keyword">인기검색어</div>
        <HotSearchKeywords />
      </SearchPageStyle>
    </>
  );
}

export default SearchPage;
