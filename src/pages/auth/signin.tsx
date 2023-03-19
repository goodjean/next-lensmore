import React, { useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import UserApi from "@/interfaces/userApi";

function Signin() {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    const idValue = idRef.current?.value;
    const pwValue = pwRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      id: idValue,
      password: pwValue,
    });
    console.log(result);

    if (!result?.error) {
      router.replace("/menu/my-page");
    } else {
      alert(result.error);
    }
  }

  if (status === "authenticated") {
    router.replace("/menu/my-page");
    return (
      <div>
        <h1>Log in</h1>
        <div>You are already logged in.</div>
        <div>Now redirect to main page.</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Sign In</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <span>아이디</span>
          <input type="text" placeholder="아이디를 입력해주세요" className="id-input" ref={idRef} required />
          <span>비밀번호</span>
          <input type="password" placeholder="비밀번호를 입력해주세요" className="pw-input" ref={pwRef} required />
        </div>
        <div className="btn-signup">
          <input type="submit" value="로그인" />{" "}
          <input type="button" value="회원가입" onClick={() => router.replace("/auth/signup")} />
        </div>
      </form>
    </div>
  );
}

export default Signin;
