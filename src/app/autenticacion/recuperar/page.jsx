"use client";
import { useFormState } from "react-dom";

import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/ui/submit-button";
import { forgotPassword, register } from "@/lib/server-actions/auth-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Register() {
  const router = useRouter();
  const [errorMessage, submitAction] = useFormState(forgotPassword, "");

  /* useEffect(() => {
    if (errorMessage === 201) {
      router.push("/autenticacion/inicio");
    }
  }, [errorMessage]); */

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
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
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
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
          <SubmitButton text="Enviar" />
        </form>
        {/* <Form action={submitAction}>
          <div className="text-red-500">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
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
        </Form> */}
      </div>
    </div>
  );
}
