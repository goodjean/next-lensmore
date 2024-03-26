import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { BsInbox } from "react-icons/bs";
import LenslistItem from "@/components/main/LenslistItem";
import { useSession } from "next-auth/react";
import WishlistApi from "@/interfaces/wishlistApi";
import { IBestLensItem } from "@/types/lens/lens";

const WishListContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 40px;

  .lenslist-container {
    padding: 20px;
    width: 100%;
    display: flex;
    // display: grid;
    // justify-content: space-evenly;
    flex-wrap: wrap;
    // grid-template-columns: repeat(3, 1fr);
    // grid-gap: 20px;
    gap: 12.1px;

    @media screen and (max-width: 500px) {
      gap: 7.3px;
    }
  }

  .none-results {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 150px 0;
    gap: 18px;
  }

  .result-count {
    color: #646464;
    padding-left: 20px;
  }

  .about-all-bx {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
  }

  .all-delete {
    width: 93%;
    background-color: #fed2d9;
    color: #fffffd;
    font-weight: bold;
    font-size: 17px;
    border-radius: 5px;
    border: 1px solid #fed2d9;
    padding: 15px;
    cursor: pointer;
  }

  .all-delete:hover {
    background-color: #fa5d60;
  }
`;

interface WishListContainerProps {
  lenslist: IBestLensItem[];
  setLenslist: Dispatch<SetStateAction<IBestLensItem[]>>;
}

function WishListContainer({ lenslist, setLenslist }: WishListContainerProps) {
  const { data: session, status } = useSession();

  async function deleteAllWishList() {
    const wishlistApi = new WishlistApi();
    if (session?.user?.email) {
      const result = await wishlistApi.deleteAllWishlist();
      if (result) {
        setLenslist([]);
      }
    }
  }

  return (
    <>
      {lenslist.length === 0 ? (
        <WishListContainerStyle>
          <div className="none-results">
            <BsInbox style={{ fontSize: 60 }} />
            <h3>찜한 상품이 없습니다</h3>
          </div>
        </WishListContainerStyle>
      ) : (
        <WishListContainerStyle>
          <div className="about-all-bx">
            <span className="result-count">{`전체 검색 결과 (${lenslist.length})`}</span>
          </div>
          <ul className="lenslist-container">
            {lenslist.map((lens) => (
              <LenslistItem key={lens.id} lens={lens} wishlist={lenslist} />
            ))}
          </ul>
          <button className="all-delete" onClick={deleteAllWishList}>
            전체삭제
          </button>
        </WishListContainerStyle>
      )}
    </>
  );
}

export default WishListContainer;
