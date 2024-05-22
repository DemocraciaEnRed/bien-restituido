import { NextApiRequestExtend } from "@/app/api/handler";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface RequestContext {
  params: {
    id: string;
  };
}
export const registerSchema = z.object({
  email: z.string().email({ message: "El email no es válido" }),
  password: z.string().min(6, {
    message: "La contraseña no es valida (debe tener al menos 6 caracteres)",
  }),
  name: z.string().min(1, { message: "El nombre no es valido" }),
});

export async function registerValidator(
  req: NextApiRequestExtend,
  event: RequestContext,
  next: Function
) {
  const body = req.data;

  const validation = registerSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  return next();
}
