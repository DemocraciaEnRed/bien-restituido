"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { RegisterForm } from "@/app/autenticacion/_component/register-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { register } from "@/lib/server-actions/auth-actions";
import { redirectHard } from "@/lib/server-actions/general";

export default function Register() {
  const router = useRouter();
  const [errorMessage, submitAction] = useFormState(register, "");

  useEffect(() => {
    if (errorMessage.status === 201) {
      router.push("/autenticacion/inicio");
    }
  }, [errorMessage]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Registro</h3>
          <p className="text-sm text-gray-500">
            Crea una cuenta con tu correo electrónico y contraseña{" "}
          </p>
        </div>
        <RegisterForm action={submitAction}>
          {errorMessage && errorMessage.status !== 201 && (
            <div className="text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
          <SubmitButton text="Registrar" />
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => redirectHard("/autenticacion/inicio")}
              className="font-semibold text-gray-800"
            >
              inicia sesion
            </button>
          </p>
        </RegisterForm>
      </div>
    </div>
  );
}
