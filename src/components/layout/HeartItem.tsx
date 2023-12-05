import WishlistApi from "@/interfaces/wishlistApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import styled from "styled-components";

const HeartStyle = styled.span`
  text-align: left;
  max-height: 28px;
  padding: 2px;
  position: absolute;
  right: 4px;
  bottom: 55px;
  cursor: pointer;
`;

interface HeartItemProps {
  lensId: number;
}

function HeartItem({ lensId }: HeartItemProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const wishlistApi = new WishlistApi();
      if (session?.user?.email) {
        const wishlist = await wishlistApi.getWishList();
        if (wishlist.some((item) => item.id === lensId)) {
          setState(true);
        } else {
          setState(false);
        }
      } else {
        setState(false);
      }
    })();
  }, [setState]);

  async function clickHeart() {
    //로그인 되어 있는지 체크
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    } else {
      //되어있다면
      if (status === "authenticated") {
        // 로그인이 되어있다면 서버로 wishlist id 추가 or 삭제 가능하고 그에 대한 wishlistid 목록 가져와서 잇는지 없는지 비교
        const wishlistApi = new WishlistApi();
        if (session.user?.email) {
          const result = await wishlistApi.addLike(lensId);
          setState(result);
        }
      }
    }
  }

  return (
    <HeartStyle onClick={clickHeart}>
      {state ? <BsHeartFill color="#DB7093" size={22} /> : <BsHeart color="#DB7093" size={22} />}
    </HeartStyle>
  );
}

export default HeartItem;
