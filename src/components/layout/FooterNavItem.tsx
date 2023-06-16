import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

const FooterNavItemStyle = styled.li`
  display: flex;
  flex-basis: 18%;
  height: 67px;
  z-index: 100;

  .footer-link-bx {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 3px;
    color: #787878;

    span {
      padding-top: 4px;
      font-size: 0.75rem;
    }

    .on {
      color: red;
    }
  }
`;

interface FooterNavItemProps {
  footerNavItem: { id: number; link: string; title: string; icon: IconType };
  state: string;
}

function FooterNavItem({ footerNavItem, state }: FooterNavItemProps) {
  return (
    <FooterNavItemStyle>
      <Link href={footerNavItem.link} className="footer-link-bx">
        <footerNavItem.icon size={27} className={state} />
        <span className={state}>{footerNavItem.title}</span>
      </Link>
    </FooterNavItemStyle>
  );
}

export default FooterNavItem;
