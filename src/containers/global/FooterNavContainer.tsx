import FooterNavItem from "@/components/layout/FooterNavItem";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoColorFilterOutline, IoAppsOutline, IoHeartOutline, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import styled from "styled-components";

const FooterNavContainerStyle = styled.div`
  background-color: #ffffff;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 100;
  border-top: 1px solid #e8e8e8;

  .footer-bx {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-around;
  }
`;

function FooterNavContainer() {
  const router = useRouter();
  const [footerNavItemList, setFooterNavItemsList] = useState([
    { id: 1, link: "/", title: "홈", icon: IoHomeOutline },
    { id: 2, link: "/menu/brand", title: "브랜드", icon: IoColorFilterOutline },
    { id: 3, link: "/menu/all-products", title: "모아보기", icon: IoAppsOutline },
    { id: 4, link: "/menu/wishlist", title: "찜목록", icon: IoHeartOutline },
    { id: 5, link: "/menu/my-page", title: "My", icon: IoPersonOutline },
  ]);

  return (
    <FooterNavContainerStyle>
      <ul className="footer-bx">
        {footerNavItemList.map((footerNavItem) => (
          <FooterNavItem
            key={footerNavItem.id}
            footerNavItem={footerNavItem}
            state={router.pathname === footerNavItem.link ? "on" : ""}
          />
        ))}
      </ul>
    </FooterNavContainerStyle>
  );
}

export default FooterNavContainer;
