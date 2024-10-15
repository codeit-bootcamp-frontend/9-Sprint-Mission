import { useRouter } from "next/router";
import styled from "styled-components";

export function LoginButton() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/signin");
  };

  return <Button onClick={handleNavigate}>로그인</Button>;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 40px;
  border-radius: 8px;
  background-color: var(--blue);
  color: white;
`;
