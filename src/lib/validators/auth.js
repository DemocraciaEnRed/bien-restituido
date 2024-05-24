import { z } from "zod";
import { messages } from "../utils/messages";


const registerSchema = z.object({
  email: z.string().email({ message: messages.validationError.email }),
  password: z.string().min(6, {
    message: messages.validationError.password,
  }),
  name: z.string().min(1, { message: messages.validationError.name }),
});

export async function registerValidator(
  req,
  res,
  next,
) {
  const data = req.data;

  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).send(validation.error.format());
  }
  return next();
}


const loginSchema = z.object({
  email: z.string().email({ message: messages.validationError.email }),
  password: z.string().min(6, {
    message: messages.validationError.password,
  }),
});

export async function loginValidator(
  req,
  res,
  next,
) {
  const data = req.data;

  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).send(validation.error.format());
  }
  return next();
}


const tokenSchema = z.object({
  token: z.string().min(1, { message: messages.auth.error.tokenNotFound }),
})

export async function tokenValidator(
  req,
  res,
  next,
) {
  const data = req.params;

  const validation = tokenSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).send(validation.error.format());
  }
  return next();
}

const emailSchema = z.object({
  email: z.string().email({ message: messages.validationError.email }),
});

export async function emailValidator(
  req,
  res,
  next,
) {
  const data = req.data;

  const validation = emailSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).send(validation.error.format());
  }
  return next();
}

const doblePasswordSchema = z.object({
  password: z.string().min(6, {
    message: messages.validationError.password,
  }),
  confirmPassword: z.string().min(6, {
    message: messages.validationError.password,
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});;

export async function doblePasswordValidator(
  req,
  res,
  next,
) {
  const data = req.data;

  const validation = doblePasswordSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).send(validation.error.format());
  }
  return next();
}
