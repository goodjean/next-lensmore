import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import UserApi from "@/interfaces/userApi";
import { AxiosError } from "axios";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import styled from "styled-components";

const MyPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .profile {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .profile-img-bx {
    width: 40%;
    padding-top: 20px;
  }

  .profile-img {
    width: 100%;
  }

  .profile-name {
    width: 60%;
    line-height: 1.5;
    font-size: 15px;
    // padding-left: 70px;
    text-align: center;
  }

  .btn-signout {
    width: 100%;
    // background-color: red;
    display: flex;
    justify-content: center;
    margin-top: 40px;

    button {
      width: 98%;
      padding: 20px;
      border: none;
      border-radius: 10px;
      color: #5f5f5f;
      font-weight: bold;
      font-size: 17px;
      cursor: pointer;
    }

    button:hover {
      background-color: black;
      color: white;
    }
  }
`;

function Mypage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const userApi = new UserApi();
  //     try {
  //       const response = await userApi.getUserId(session?.user?.name);
  //       setUserId(response.message);
  //     } catch (error: unknown) {
  //       // console.log(error.response.data.result);
  //       if (error instanceof AxiosError) alert(error.response?.data.result.message);
  //     }
  //   })();
  // }, [session?.user?.name]);

  if (status === "unauthenticated") {
    console.log(status);
    router.replace("/auth/signin");
    // alert("로그인이 되어있지 않습니다.");
  }

  return (
    <>
      <BackHomeNavBar title="MyPage" />
      {status === "authenticated" ? (
        <MyPageStyle>
          <section className="profile">
            <div className="profile-img-bx">
              <img src="/user.png" alt="profile" className="profile-img" />
            </div>
            <div className="profile-name">
              <h3>안녕하세요 {session.user?.name} 님 !</h3>
            </div>
          </section>
          <div className="btn-signout">
            <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>로그아웃</button>
          </div>
        </MyPageStyle>
      ) : (
        <MyPageStyle>
          <h1>아직 로그인 안됨</h1>
        </MyPageStyle>
      )}
    </>
  );
}

export default Mypage;
