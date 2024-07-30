import Link from "next/link";

export default function SendVerification() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Verificar tu usuario</h3>
          <p className="text-sm text-gray-500">
            Gracias por registrarte. Hemos enviado un correo electrónico a tu
            direccion de correo electronico con instrucciones sobre cómo
            verificar tu cuenta.
            <br />
            Por favor, revisa tu bandeja de entrada y sigue las indicaciones
            proporcionadas para completar el proceso de verificación. Si no
            encuentras el correo en tu bandeja de entrada, revisa también tu
            carpeta de spam o correo no deseado.
          </p>
          <Link href="/">ir al inicio</Link>
        </div>
      </div>
    </div>
  );
}
