"use client";
import { useFormState } from "react-dom";

import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/ui/submit-button";
import { forgotPassword } from "@/lib/server-actions/authentication/auth-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Forgot() {
  const router = useRouter();
  const [formMessage, submitAction] = useFormState(forgotPassword, "");

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Recupera tu contraseña</h3>
          <p className="text-sm text-gray-500">
            No te preocupes, recuperarla es fácil. Introduce tu correo
            electrónico y sigue las instrucciones en el correo que recibirás
            para restablecer tu contraseña.
          </p>
        </div>

        <form
          action={submitAction}
          className="flex flex-col space-y-4 w-100 bg-gray-50 px-4 py-8 sm:px-6"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              required
            />
          </div>
          {formMessage && (
            <div
              className={
                formMessage.status === 200 ? "text-green-600" : "text-red-500"
              }
            >
              <p>{formMessage.message}</p>
            </div>
          )}
          <SubmitButton text="Enviar" />
        </form>
        <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-white px-4 py-3 text-center sm:px-16">
          <Link href="/">ir al inicio</Link>
        </div>
      </div>
    </div>
  );
}
