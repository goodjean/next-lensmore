import { IHotkeyword } from "@/types/lens/lens";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const HotKeywordStyle = styled.li`
  width: 100%;
  padding: 18px 0;
  border-bottom: 2px solid #f6f6f6;
  line-height: 1.45;
  font-size: 17.5px;
  font-weight: 500;
  cursor: pointer;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;

  .hot-bx {
    width: 100%;
    padding: 0 25px;
    display: flex;
    gap: 40px;
  }

  .hot-index {
    width: 5%;
    color: #fb7eb4;
    font-weight: 700;
  }
`;

interface HotKeywordProps {
  hotKeyword: IHotkeyword;
  index: number;
}

function HotKeyword({ hotKeyword, index }: HotKeywordProps) {
  const router = useRouter();

  return (
    <HotKeywordStyle
      onClick={() => {
        router.push(`/product/${hotKeyword.id}`);
      }}
    >
      <div className="hot-bx">
        <span className="hot-index">{index + 1}</span>
        <span>{hotKeyword.name}</span>
      </div>
    </HotKeywordStyle>
  );
}

export default HotKeyword;
