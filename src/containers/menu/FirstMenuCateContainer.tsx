import React from "react";
import { useRouter } from "next/router";

function FirstMenuCateContainer() {
  const router = useRouter();
  return (
    <ul>
      <li>
        <div onClick={() => router.replace("/menu/my-page")}>마이페이지</div>
      </li>
      <li>
        <div>찜목록</div>
      </li>
      <li>
        <div>브랜드</div>
      </li>
    </ul>
  );
}

export default FirstMenuCateContainer;
