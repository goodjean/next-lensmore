import React from "react";
import styled from "styled-components";

const FilterPageStyle = styled.div`
  width: 100%;
  background-color: white;

  nav {
    background-color: brown;
    width: 100%;
    display: flex;
    // justify-content: space-between;
    // align-items: ;
  }
`;

function FilterPage() {
  return (
    <FilterPageStyle>
      <nav>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </nav>
    </FilterPageStyle>
  );
}

export default FilterPage;
