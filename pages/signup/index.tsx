import Button from "@/components/UI/Button/Button";
import InputItem from "@/components/UI/InputItem";
import axios from "@/api/axios";
import { FormEvent, useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      if (response.data.success) {
        setMessage("회원가입이 성공적으로 완료되었습니다.");
      } else {
        setMessage("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      setMessage("에러가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <section className="container" style={{ marginTop: "100px" }}>
      <form onSubmit={handleSignUpSubmit}>
        <InputItem
          label="이메일"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(email) => email}
          placeholder="이메일을 입력해주세요"
          type="email"
        />
        <InputItem
          label="닉네임"
          id="name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(name) => name}
          placeholder="닉네임을 입력해주세요"
          type="text"
        />
        <InputItem
          label="비밀번호"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(password) => password}
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <InputItem
          label="비밀번호 확인"
          id="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          onKeyDown={(password) => password}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          type="password"
        />
        <Button type="submit">회원가입</Button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default SignUp;
