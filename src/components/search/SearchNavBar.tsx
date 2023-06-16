import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { IoArrowBackOutline, IoSearchOutline } from "react-icons/io5";

const SearchNavBarStyle = styled.form`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 14px;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0px;
  background-color: white;

  nav {
    cursor: pointer;
  }

  button {
    border: 0;
    outline: 0;
    background: white;
    cursor: pointer;
  }

  .inp-bx {
    width: 78%;
    height: 100%;
    padding: 18px;
    border: 0;
    border-radius: 12px;
    outline: none;
    color: #222;
    background-color: #f1f1f1;
    font-size: 18px;
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;

    &::placeholder {
      color: #aeaeae;
    }
  }
`;

function SearchNavBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!keyword) {
      return;
    } else {
      router.push(`/search/results/${keyword}`);
    }
  }

  return (
    <SearchNavBarStyle onSubmit={submit}>
      <nav onClick={() => router.back()}>
        <IoArrowBackOutline size={29} color="#6e6e6e" />
      </nav>
      <input type="text" placeholder="검색어를 입력해 주세요" className="inp-bx" value={keyword} onChange={change} />
      <button>
        <IoSearchOutline size={29} color="#6e6e6e" />
      </button>
    </SearchNavBarStyle>
  );
}

export default SearchNavBar;
