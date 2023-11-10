import React, { ReactNode } from "react";
import styled from "styled-components";

const AppLayoutStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .app-template {
    max-width: 650px;
    width: 100%;
    height: 100%;
    border: 1px solid #e8e8e8;
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
      <div className="app-template">{children}</div>
    </AppLayoutStyle>
  );
}

export default AppLayout;
