import React, { ReactNode } from "react";
import styled from "styled-components";

const AppLayoutStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .inner-wrap {
    max-width: 680px;
    width: 75%;
    height: 100%;
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutStyle>
      <div className="inner-wrap">{children}</div>
    </AppLayoutStyle>
  );
}

export default AppLayout;
