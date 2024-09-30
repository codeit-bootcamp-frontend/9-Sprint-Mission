import { FieldErrors, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SigninSchema } from "./signin/signinConstants";
import { SignupSchema } from "./signup/signupContants";

export interface ISigninForm {
  form: UseFormReturn<z.infer<typeof SigninSchema>>
  isLoading: boolean;
  error: FieldErrors<z.infer<typeof SigninSchema>>;
}

export interface ISignupForm {
  form: UseFormReturn<z.infer<typeof SignupSchema>>
  isLoading: boolean;
  error: FieldErrors<z.infer<typeof SignupSchema>>;
}