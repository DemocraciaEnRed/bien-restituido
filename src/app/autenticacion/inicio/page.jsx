"use client";
import { useFormState } from "react-dom";

import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { login } from "@/lib/server-actions/auth-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { useAuthContext } from "@/context/auth-contet";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login({ searchParams }) {
  const router = useRouter();
  const { loginContext } = useAuthContext();
  const [formStatus, submitAction] = useFormState(login, "");
  useEffect(() => {
    if (formStatus && formStatus.status === 200) {
      loginContext(formStatus);
      router.push(searchParams ? searchParams.next : "/");
    }
  }, [formStatus]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Iniciar sesion</h3>
          <p className="text-sm text-gray-500">
            Utilice su correo electrónico y contraseña para iniciar sesión
          </p>
        </div>
        <LoginForm action={submitAction}>
          <Link href="/autenticacion/restaurar" className="text-right">
            ¿Olvidaste tu contraseña?
          </Link>
          {formStatus && formStatus.status !== 200 && (
            <div className="text-red-500">
              <p>{formStatus.message}</p>
            </div>
          )}
          <SubmitButton text="iniciar sesión" />
          <p className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/autenticacion/registro"
              className="font-semibold text-gray-800"
            >
              Registrate.
            </Link>
          </p>
        </LoginForm>
      </div>
    </div>
  );
}
