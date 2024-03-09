import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import BrandListItem from "@/components/menu/BrandListItem";
import LensApi from "@/interfaces/lensApi";
import { IBrands } from "@/types/lens/lens";
import React from "react";
import styled from "styled-components";

const BrandPageStyle = styled.ul`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  list-style: none;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;
`;

export async function getServerSideProps() {
  const lensApi = new LensApi();
  const brandList = await lensApi.getLensBrandList();

  return {
    props: {
      brands: brandList,
    },
  };
}

interface BrandPageProps {
  brands: IBrands[];
}

function BrandPage({ brands }: BrandPageProps) {
  return (
    <>
      <BackHomeNavBar title="Brand" />
      <BrandPageStyle>
        {brands.map((brand) => (
          <BrandListItem key={brand.id} brand={brand} />
        ))}
      </BrandPageStyle>
    </>
  );
}

export default BrandPage;
