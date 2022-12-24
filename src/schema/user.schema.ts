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

export const updateUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required"
    }).optional(),
    lastName: string({
      required_error: "Last name is required"
    }).optional(),
    password: string({
      required_error: "Password is required"
    })
      .min(6, "Password must be at least 6 characters")
      .optional(),
    email: string({
      required_error: "Email is required"
    })
      .email("Email is not valid")
      .optional()
  })
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>["body"];

export const verifyUserSchema = object({
  params: object({
    id: string({
      required_error: "Invalid user id"
    }),
    verificationCode: string({
      required_error: "Invalid verification code"
    })
  })
});

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required to reset password"
    }).email("Invalid email")
  })
});
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string()
  }),
  body: object({
    password: string({
      required_error: "Password is required"
    }).min(6, "Password must be at least 6 characters"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required"
    })
  }).refine((date) => date.password === date.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
  })
});

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
