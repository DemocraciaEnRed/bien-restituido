import { Form } from "@/components/auth/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  async function login(params) {
    "use server";
    console.log("login");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Iniciar sesion</h3>
          <p className="text-sm text-gray-500">
            Utilice su correo electrónico y contraseña para iniciar sesión
          </p>
        </div>
        <Form action={login}>
          <Button>iniciar sesión</Button>
          <p className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/registro" className="font-semibold text-gray-800">
              Registrate.
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
