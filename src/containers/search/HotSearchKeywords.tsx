import HotKeyword from "@/components/search/HotKeyword";
import SearchApi from "@/interfaces/searchApi";
import { IHotkeyword } from "@/types/lens/lens";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HotKeywordsStyle = styled.ul`
  // background-color: red;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

function HotSearchKeywords() {
  const [hotKeywords, setHotKeywords] = useState<IHotkeyword[]>([]);

  useEffect(() => {
    (async () => {
      const searchApi = new SearchApi();
      const hotKeywordList = await searchApi.getHotSearchKeywords();
      setHotKeywords(hotKeywordList);
    })();
  }, []);

  return (
    <HotKeywordsStyle>
      {hotKeywords.map((hotKeyword, index) => (
        <HotKeyword key={hotKeyword.id} hotKeyword={hotKeyword} index={index} />
      ))}
    </HotKeywordsStyle>
  );
}

export default HotSearchKeywords;
