"use server";

import { routes } from "@/config/routes";
import { signIn } from "../../../auth";
import { SignInSchema } from "../schemas/auth.schema";
import { PrevState } from "@/config/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { genericRateLimit } from "@/lib/rate-limiter";

export const SignInAction = async (_: PrevState, formData: FormData) => {
  try {
    const limiterError = await genericRateLimit("login");
    if (limiterError) {
      return limiterError;
    }
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const { data, success, error } = SignInSchema.safeParse({
      email,
      password,
    });
    if (!success) {
      console.error("SignInAction validation error:", error);
      return {
        success: false,
        message: error?.message || "Invalid input",
      };
    }
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    console.error("SignInAction error:", error);
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
