import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import UserApi from "@/interfaces/userApi";
import { ApiErrors, ApiInstance } from "@/server/errs/error";
import { AxiosError } from "axios";

function Mypage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const userApi = new UserApi();
      try {
        const response = await userApi.getUserId(session?.user?.name);
        setUserId(response.message);
      } catch (error: unknown) {
        // console.log(error.response.data.result);
        if (error instanceof AxiosError) alert(error.response?.data.result.message);
      }
    })();
  }, [session?.user?.name]);

  if (status === "unauthenticated") {
    console.log(status);
    router.replace("/auth/signin");
    alert("로그인이 되어있지 않습니다.");
  }

  console.log(userId);

  return (
    <div>
      {status === "authenticated" ? (
        <>
          <section>
            <div>
              <Image src="/user.png" alt="profile" width={100} height={100} />
            </div>
            <div>
              <div>
                <h3>안녕하세요 {session.user?.name} 님 !</h3>
                {/* <h3>{session.user?.name}</h3> */}
              </div>
            </div>
          </section>
          <div>
            <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>로그아웃</button>
          </div>
        </>
      ) : (
        <>
          <h1>아직 로그인 안됨</h1>
        </>
      )}
    </div>
  );
}

export default Mypage;
