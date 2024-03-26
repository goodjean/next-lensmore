import WishlistApi from "@/interfaces/wishlistApi";
import { IBestLensItem } from "@/types/lens/lens";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HeartStyle = styled.span`
  text-align: left;
  max-height: 28px;
  padding: 2px;
  position: absolute;
  right: 4px;
  bottom: 62px;
  cursor: pointer;
`;

interface HeartItemProps {
  lensId: number;
  wishlist: IBestLensItem[];
}

function HeartItem({ lensId, wishlist }: HeartItemProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // const wishlistApi = new WishlistApi();
      if (session?.user?.email) {
        // const wishlist = await wishlistApi.getWishList();
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
        const userId = session.user?.email;
        const userIdStr = String(userId);
        if (session.user?.email) {
          const result = await wishlistApi.addLike(userIdStr, lensId);
          setState(result);
        }
      }
    }
  }

  return (
    <HeartStyle onClick={clickHeart}>
      {state ? (
        <img src="https://content.zigzag.kr/_icon/card/card_heart_filled.png" alt="하트" width={30} height={30} />
      ) : (
        <img src="https://content.zigzag.kr/_icon/card/card_heart_bordered.png" alt="하트" width={30} height={30} />
      )}
    </HeartStyle>
  );
}

export default HeartItem;
