"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { SigninSchema } from "./signinConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import SigninForm from "@/components/auth/SigninForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useToken from "@/hooks/useToken";

const Signin = () => {
  const router = useRouter();
  const context = useToken();

  useEffect(() => {
    if (context?.session) {
      router.push("/");
    }
  }, [router, context?.session]);

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    mode: "all",
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;

  return (
    <SigninForm form={form} isLoading={isLoading} error={error} />
  )
}

export default Signin;