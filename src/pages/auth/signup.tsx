import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserApi from "@/interfaces/userApi";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import styled from "styled-components";

const SignupStyle = styled.div`
  width: 94%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;

  @media screen and (max-width: 450px) {
    border: none;
  }

  .lensmore-header {
    width: 100%;
    text-align: center;
    line-height: 1.6;
    margin-top: 10px;
    padding-top: 8px;

    h1 {
      @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
      font-family: "Nanum Gothic", sans-serif;
      color: #505050;
      font-weight: normal;
      font-size: 34px;
      cursor: pointer;
    }

    p {
      @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
      font-family: "Nanum Gothic", sans-serif;
      color: #505050;
      font-weight: bold;
      font-size: 14.5px;
    }
  }

  .form-container {
    width: 92%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 50px 0 40px 0;
  }

  .input-bx {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;

    span {
      font-size: 15px;
      font-weight: bold;
      color: darkgray;
      margin-top: 10px;
      font-size: 16px;
    }

    .id-pw-name-input {
      width: 100%;
      padding: 32px 10px 17px;
      outline: none;
      border: none;
      border-bottom: 2px solid #f1f1f1;
      font-size: 16px;
    }

    input::placeholder {
      color: #a0a0a0;
    }
  }

  .btn-sign-bx {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 40px;
  }
`;

const SignupBtnStyle = styled.input`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#f2f2f2" : "black")};
  color: ${(props) => (props.disabled ? "#5f5f5f" : "#dcdcdc")};
  font-weight: bold;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid #f2f2f2;
  padding: 20px;
  cursor: pointer;
`;

function Signup() {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleInputChange = () => {
      const currentIdValue = !idRef.current?.value;
      const currentPwValue = !pwRef.current?.value;
      const currentNameValue = !nameRef.current?.value;
      if (currentIdValue === false && currentPwValue === false && currentNameValue === false) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    // input 요소의 변화 감지를 위해 이벤트 리스너를 추가합니다.
    idRef.current?.addEventListener("input", handleInputChange);
    pwRef.current?.addEventListener("input", handleInputChange);
    nameRef.current?.addEventListener("input", handleInputChange);
    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => {
      idRef.current?.removeEventListener("input", handleInputChange);
      pwRef.current?.removeEventListener("input", handleInputChange);
      nameRef.current?.removeEventListener("input", handleInputChange);
    };
  }, []);

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
    <>
      <BackHomeNavBar title="Sign Up" />
      <SignupStyle>
        <div className="lensmore-header">
          <h1>LensMore</h1>
          <p>렌즈는 모아보기는 여기서.</p>
        </div>
        <form onSubmit={submitHandler} className="form-container">
          <div className="input-bx">
            <span>아이디</span>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="id-pw-name-input"
              ref={idRef}
              required
              pattern="^([a-z0-9]){7,13}$"
              title="아이디를 7~13자리 내로 입력하세요 (소문자 또는 숫자 사용)"
            />
            <span>비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="id-pw-name-input"
              ref={pwRef}
              required
              pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{7,13}"
              title="영문 대소문자, 숫자, 특수문자를 꼭 포함하여 7~13자"
            />
            <span>이름</span>
            <input type="text" placeholder="이름을 입력해주세요" className="id-pw-name-input" ref={nameRef} required />
          </div>
          <div className="btn-sign-bx">
            <SignupBtnStyle type="submit" value="회원가입하기" disabled={isDisabled} />
          </div>
        </form>
      </SignupStyle>
    </>
  );
}

export default Signup;
