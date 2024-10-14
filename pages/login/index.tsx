import { zodResolver } from "@hookform/resolvers/zod"; // zod로 유효성 검사
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { ErrorMessage } from "@/components/UI/CommonStyles";
import Button from "@/components/UI/Button/Button";
import InputItem from "@/components/UI/InputItem";
import EasyLogin from "@/components/UI/auth/EasyLogin";
import AuthForm from "@/components/UI/auth/AuthForm";

// 비밀번호 조건 정규표현식
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

const Login = () => {
  const router = useRouter();
  const { Login } = useAuth();
  // 원하는 형식의 스키마 생성
  const SignInSchema = z.object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요" })
      .email({ message: "이메일을 올바르게 입력해 주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
      .max(15, { message: "비밀번호를 15자리 이하 입력해 주세요." })
      .regex(passwordRegex, {
        message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
      }),
  });

  type SignInSchemaType = z.infer<typeof SignInSchema>;

  // Zod의 infer과 JS의 `typeof` 연산자를 사용해서 이미 정의한 스키마로 부터 타입을 추출
  // 정의한 스키마를 zodResolver의 인수로 넣어준다
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange", // 필드 값이 변경될 때마다 유효성 검사를 수행
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      const response = await axios.post("/auth/signIn", data);

      const [accessToken, refreshToken] = [
        response.data.accessToken,
        response.data.refreshToken,
      ];
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);

      Login(); // 로그인 상태 업데이트

      router.push("/");
      confirm("로그인에 성공하였습니다!🎉");
    } catch (error) {
      console.error("로그인에 실패하였습니다.", error);
    }
  };

  // form 제출 버튼 활성화 조건: 이메일과 비밀번호 모두 유효한 값이 있을 때만 버튼 활성화
  const isSubmitDisabled = !watch("email") || !watch("password") || !isValid;

  return (
    <AuthForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputItem
            label="이메일"
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <InputItem
            label="비밀번호"
            type="password"
            id="password"
            placeholder="이메일을 입력해주세요"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <Button disabled={isSubmitDisabled}>로그인</Button>
      </form>

      <EasyLogin
        txt="판다마켓이 처음이신가요?"
        link="/signup"
        button="회원가입"
      />
    </AuthForm>
  );
};

export default Login;
