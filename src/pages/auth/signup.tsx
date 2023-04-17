import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserApi from "@/interfaces/userApi";

function Signup() {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const { status } = useSession();
  const router = useRouter();

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    const idValue = idRef.current?.value;
    const pwValue = pwRef.current?.value;
    const nameValue = nameRef.current?.value;

    const userApi = new UserApi();

    try {
      await userApi.registerUser(idValue, pwValue, nameValue);
      router.replace("/auth/signin");
    } catch (error) {
      alert("이미 존재하는 아이디입니다.");
    } // 요기서 if(res.data) {router} else alert(res.error.message) 하고픈데 runtime error
  }

  if (status === "authenticated") {
    router.replace("/");
    return (
      <div>
        <h1>Sign Up</h1>
        <div>You are already signed up.</div>
        <div>Now redirect to main page.</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <span>아이디</span>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            className="id-input"
            ref={idRef}
            required
            pattern="^([a-z0-9]){7,13}$"
            title="아이디를 7~13자리 내로 입력하세요 (소문자 또는 숫자 사용)"
          />
          <span>비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="pw-input"
            ref={pwRef}
            required
            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{7,13}"
            title="영문 대소문자, 숫자, 특수문자를 꼭 포함하여 7~13자"
          />
          <span>이름</span>
          <input type="text" placeholder="이름을 입력해주세요" className="name-input" ref={nameRef} required />
        </div>
        <div className="btn-signup">
          <input type="submit" value="회원가입하기" />
        </div>
      </form>
    </div>
  );
}

export default Signup;
