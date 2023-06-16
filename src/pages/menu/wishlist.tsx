import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import WishListContainer from "@/containers/menu/WishListContainer";
import WishlistApi from "@/interfaces/wishlistApi";
import { IBestLensItem } from "@/types/lens/lens";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function WishListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lenslist, setLenslist] = useState<IBestLensItem[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("session", session);
      alert("로그인이 필요합니다");
      router.replace("/auth/signin");
    }
    if (status === "authenticated") {
      (async () => {
        const wishlistApi = new WishlistApi();
        if (session.user?.email) {
          const wishlist = await wishlistApi.getLensWishList(session.user?.email);
          setLenslist(wishlist);
        }
      })();
    }
  }, [status, lenslist]);

  return (
    <>
      <BackHomeNavBar title="WishList" />
      {status === "authenticated" ? (
        <>
          <WishListContainer lenslist={lenslist} />
        </>
      ) : (
        <>
          <div>you need to login to use this service</div>
        </>
      )}
    </>
  );
}

export default WishListPage;
