import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required"
    }),
    lastName: string({
      required_error: "Last name is required"
    }),
    password: string({
      required_error: "Password is required"
    }).min(6, "Password must be at least 6 characters"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required"
    }),
    email: string({
      required_error: "Email is required"
    }).email("Email is not valid")
  }).refine((date) => date.password === date.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
  })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string()
  })
});

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export const resetPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required to reset password"
    }).email("Invalid email")
  })
});
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>["body"];
