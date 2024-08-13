"use client";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/ui/submit-button";
import { restorePassword } from "@/lib/server-actions/authentication/auth-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export default function Restore({ params: { token } }) {
  const router = useRouter();
  const [formMessage, submitAction] = useFormState(restorePassword, "");
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Ingresa tu nueva contraseña</h3>
        </div>

        {!formMessage || formMessage.status !== 200 ? (
          <form
            action={submitAction}
            className="flex flex-col space-y-4 w-100 bg-gray-50 px-4 py-8 sm:px-6"
          >
            <Input
              id="token"
              name="token"
              type="text"
              className="hidden"
              value={token}
            />
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
            {formMessage && formMessage.status !== 201 && (
              <div className="text-red-500 text-center">
                <p>{formMessage.message}</p>
              </div>
            )}
            <SubmitButton text="Cambiar contraseña" />
          </form>
        ) : (
          <div></div>
        )}
        <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-white px-4 py-3 text-center sm:px-16">
          <Link href="/autenticacion/inicio">ir al inicio</Link>
        </div>
      </div>
    </div>
  );
}
