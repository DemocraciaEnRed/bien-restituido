"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { useRouter } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { register } from "@/lib/actions/authentication/auth-actions";
import { redirectHard } from "@/lib/actions/general";

export default function Register() {
  const router = useRouter();
  const [status, action] = useFormState(register, "");

  useEffect(() => {
    if (status.status === 201) {
      router.push("/autenticacion/inicio");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Registro</h3>
          <p className="text-sm text-gray-500">
            Crea una cuenta con tu correo electrónico y contraseña
          </p>
        </div>
        <RegisterForm status={status} action={action}>
          {status &&
            status.status !== 201 &&
            typeof status.errors === "string" && (
              <div className="text-red-500">
                <p>{status.errors}</p>
              </div>
            )}
          <SubmitButton text="Registrar" />
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?
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
