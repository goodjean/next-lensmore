import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import UserApi from "@/interfaces/userApi";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import styled from "styled-components";

const SigninStyle = styled.div`
  width: 94%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
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

    .id-pw-input {
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

    .btn-signup {
      width: 100%;
      background-color: #f2f2f2;
      color: #5f5f5f;
      font-weight: bold;
      font-size: 17px;
      border-radius: 5px;
      border: 1px solid #f2f2f2;
      padding: 20px;
      cursor: pointer;
    }
  }
`;

const SigninBtnStyle = styled.input`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#fed2d9" : "#fa5d60")};
  color: #fffffd;
  font-weight: bold;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid #fed2d9;
  padding: 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

function Signin() {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const handleInputChange = () => {
      const currentIdValue = !idRef.current?.value;
      const currentPwValue = !pwRef.current?.value;
      if (currentIdValue === false && currentPwValue === false) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    // input 요소의 변화 감지를 위해 이벤트 리스너를 추가합니다.
    idRef.current?.addEventListener("input", handleInputChange);
    pwRef.current?.addEventListener("input", handleInputChange);
    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => {
      idRef.current?.removeEventListener("input", handleInputChange);
      pwRef.current?.removeEventListener("input", handleInputChange);
    };
  }, []);

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    const idValue = idRef.current?.value;
    const pwValue = pwRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      id: idValue,
      password: pwValue,
    });
    // console.log(result);

    if (!result?.error) {
      router.replace("/menu/my-page");
    } else {
      // alert(result.error);
      setErrMsg(result.error);
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
    <>
      <BackHomeNavBar title="Login" />
      <SigninStyle>
        <div className="lensmore-header">
          <h1>LensMore</h1>
          <p>렌즈는 모아보기는 여기서.</p>
        </div>
        <form onSubmit={submitHandler} className="form-container">
          {errMsg === "" ? (
            <>
              <div className="input-bx">
                <span>아이디</span>
                <input type="text" placeholder="아이디를 입력해주세요" className="id-pw-input" ref={idRef} required />
                <span>비밀번호</span>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="id-pw-input"
                  ref={pwRef}
                  required
                />
              </div>{" "}
            </>
          ) : (
            <>
              <div className="input-bx">
                <span style={{ fontSize: 13, paddingBottom: 10, color: "#FF687C" }}>{errMsg}</span>
                <span>아이디</span>
                <input type="text" placeholder="아이디를 입력해주세요" className="id-pw-input" ref={idRef} required />
                <span>비밀번호</span>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="id-pw-input"
                  ref={pwRef}
                  required
                />
              </div>
            </>
          )}
          <div className="btn-sign-bx">
            <SigninBtnStyle type="submit" value="로그인" disabled={isDisabled} />
            <input
              className="btn-signup"
              type="button"
              value="회원가입"
              onClick={() => router.replace("/auth/signup")}
            />
          </div>
        </form>
      </SigninStyle>
    </>
  );
}

export default Signin;
