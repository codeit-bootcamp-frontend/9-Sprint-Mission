import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/UI/Button/Button";
import InputItem from "@/components/UI/InputItem";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const router = useRouter();
  const { Login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/signIn", {
        email,
        password,
      });

      const [accessToken, refreshToken] = [
        response.data.accessToken,
        response.data.refreshToken,
      ];
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);

      Login(); // 로그인 상태 업데이트

      router.push("/");
      console.log("로그인에 성공하였습니다.");
    } catch (error) {
      console.error("로그인에 실패하였습니다.", error);
    }
  };

  return (
    <section className="container" style={{ marginTop: "100px" }}>
      <form onSubmit={handleLoginSubmit}>
        <InputItem
          label="이메일"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
          type="email"
          required
        />
        <InputItem
          label="비밀번호"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          required
        />
        <Button type="submit">로그인</Button>
      </form>

      <Link href="/signup">회원가입</Link>
    </section>
  );
};

export default Login;
