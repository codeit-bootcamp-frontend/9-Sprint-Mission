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

const SignUp = () => {
  const router = useRouter();
  const { isAuth } = useAuth();
  // 원하는 형식의 스키마 생성
  const SignUpSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "이메일을 입력해주세요" })
        .email({ message: "이메일을 올바르게 입력해 주세요." }),
      nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
      password: z
        .string()
        .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
        .max(15, { message: "비밀번호를 15자리 이하 입력해 주세요." })
        .regex(passwordRegex, {
          message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
        }),
      passwordConfirmation: z
        .string()
        .min(1, { message: "비밀번호를 다시 입력해주세요." }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: "비밀번호가 일치하지 않습니다.",
    });

  type SignUpSchemaType = z.infer<typeof SignUpSchema>;

  // Zod의 infer과 JS의 `typeof` 연산자를 사용해서 이미 정의한 스키마로 부터 타입을 추출
  // 정의한 스키마를 zodResolver의 인수로 넣어준다
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange", // 필드 값이 변경될 때마다 유효성 검사를 수행
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    const formData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };

    try {
      await axios.post("/auth/signUp", formData);
      router.push("/login");
      confirm("회원가입이 완료되었습니다!🎉");
    } catch (error) {
      console.error("회원가입에 실패하였습니다.", error);
    }
  };

  // 회원가입 페이지에 접근시 로컬 스토리지에 accessToken이 있는 경우 "/" 페이지로 이동
  if (isAuth) {
    router.push("/");
  }

  // form 제출 버튼 활성화 조건: 이메일, 닉네임, 비밀번호, 비밀번호 확인 모두 유효한 값이 있을 때만 버튼 활성화
  const isSubmitDisabled =
    !watch("email") ||
    !watch("nickname") ||
    !watch("password") ||
    !watch("passwordConfirmation") ||
    !isValid;

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
            label="닉네임"
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            {...register("nickname")}
          />
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </div>
        <div>
          <InputItem
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div>
          <InputItem
            label="비밀번호 확인"
            type="password"
            id="passwordConfirmation"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            autoComplete="new-password"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </div>
        <Button disabled={isSubmitDisabled}>회원가입</Button>
      </form>

      <EasyLogin txt="이미 회원이신가요?" link="/login" button="로그인" />
    </AuthForm>
  );
};

export default SignUp;
