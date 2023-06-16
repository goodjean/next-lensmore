import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { IoSearchOutline, IoArrowBackOutline } from "react-icons/io5";

const BackHomeNavBarStyle = styled.header`
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 13px 8px 11px;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 100;

  nav {
    cursor: pointer;
  }

  h2 {
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
    font-family: "Nanum Gothic", sans-serif;
    color: #505050;
    font-weight: normal;
  }
`;

interface BackHomeNavBarProps {
  title: string;
}

function BackHomeNavBar({ title }: BackHomeNavBarProps) {
  const router = useRouter();

  return (
    <BackHomeNavBarStyle>
      <nav
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBackOutline size={29} />
      </nav>
      <h2>{title}</h2>
      <nav
        onClick={() => {
          router.push("/search");
        }}
      >
        <IoSearchOutline size={27} />
      </nav>
    </BackHomeNavBarStyle>
  );
}

export default BackHomeNavBar;
