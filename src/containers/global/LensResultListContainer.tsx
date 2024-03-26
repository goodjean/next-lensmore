import LenslistItem from "@/components/main/LenslistItem";
import { IBestLensItem } from "@/types/lens/lens";
import { MdSearchOff } from "react-icons/md";
import React from "react";
import styled from "styled-components";

const LensResultListStyle = styled.div`
  width: 100%;
  padding-top: 35px;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;

  .lenslist-container {
    padding: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16.7px;

    @media screen and (max-width: 700px) {
      gap: 10.2px;
    }
  }

  .none-results {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 150px 0;
    gap: 18px;
  }

  .result-count {
    color: #646464;
    padding: 20px;
  }
`;

interface LensResultListContainerProps {
  lensList: IBestLensItem[];
  listCount: number;
  wishlist: IBestLensItem[];
}

function LensResultListContainer({ lensList, listCount, wishlist }: LensResultListContainerProps) {
  return (
    <>
      {lensList.length === 0 ? (
        <LensResultListStyle>
          <div className="none-results">
            <MdSearchOff size={30} />
            <h3>검색결과가 없습니다.</h3>
          </div>
        </LensResultListStyle>
      ) : (
        <LensResultListStyle>
          <span className="result-count">{`전체 검색 결과 (${listCount})`}</span>
          <ul className="lenslist-container">
            {lensList.map((lens) => (
              <LenslistItem key={lens.id} lens={lens} wishlist={wishlist} />
            ))}
          </ul>
        </LensResultListStyle>
      )}
    </>
  );
}

export default LensResultListContainer;
