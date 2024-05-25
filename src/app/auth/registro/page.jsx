import Link from "next/link";
/* import { redirect } from "next/navigation";
import { createUser, getUser } from "app/db"; */
import { Form } from "@/components/auth/form";
import { Button } from "@/components/ui/button";

export default function Login() {
  async function register(formData) {
    "use server";
    console.log("register");
    /* let email = formData.get('email')
    let password = formData.get('password')
    let user = await getUser(email);

    if (user.length > 0) {
      return 'User already exists'; // TODO: Handle errors with useFormStatus
    } else {
      await createUser(email, password);
      redirect('/login');
    } */
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Registro</h3>
          <p className="text-sm text-gray-500">
            Crea una cuenta con tu correo electrónico y contraseña{" "}
          </p>
        </div>
        <Form action={register}>
          <Button type="submit">Registrar</Button>
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/inicio" className="font-semibold text-gray-800">
              inicia sesion
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
