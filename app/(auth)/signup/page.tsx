"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "./signupContants";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupForm from "@/components/auth/SignupForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useToken from "@/hooks/useToken";

const Signup = () => {
  const router = useRouter();
  const session = useToken();

  useEffect(() => {
    if (session?.accessToken !== null) {
      router.push("/");
    }
  }, [router, session?.accessToken]);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
    defaultValues: {
      userEmail: "",
      userNickname: "",
      userPassword: "",
      userPassword2: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;

  return (
    <SignupForm form={form} isLoading={isLoading} error={error} />
  )
}

export default Signup;