import { z } from "zod";
import { messages } from "@/lib/utils/messages";


export const registerSchema = z.object({
  email: z.string().email({ message: messages.validationError.email }),
  password: z.string().min(6, {
    message: messages.validationError.password,
  }),
  username: z.string().min(1, { message: messages.validationError.name })
});


export const loginSchema = z.object({
  email: z.string().email({ message: messages.validationError.email }),
  password: z.string().min(6, {
    message: messages.validationError.password,
  }),
});

export const tokenSchema = z.object({
  token: z.string().min(1, { message: messages.auth.error.tokenNotFound }),
})


export const emailSchema = z.object({
  email: z.string().email({ message: messages.validationError.email }),
});


export const doblePasswordSchema = z.object({
  password: z.string().min(6, {
    message: messages.validationError.password,
  }),
  confirmPassword: z.string().min(6, {
    message: messages.validationError.password,
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "las contraseñas no coinciden",
  path: ["password"],
});;

