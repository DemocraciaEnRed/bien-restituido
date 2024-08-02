import { verifyToken } from "@/lib/server-actions/authentication/auth-actions";
import Link from "next/link";

export default async function Verification({ params: { token } }) {
  const message = await verifyToken(token);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          {message && message.status !== 200 && (
            <>
              <h3 className="text-xl font-semibold text-red-500">
                Error en la verificacion
              </h3>
              <div className="text-sm text-gray-500">
                <p>
                  Lo sentimos, ha ocurrido un error durante el proceso de
                  verificación de tu cuenta.
                </p>
                <p>Esto puede deberse a varios motivos:</p>
                <ul>
                  <li>El enlace de verificación ha expirado.</li>
                  <li>El enlace de verificación ya ha sido utilizado.</li>
                  <li>Hubo un problema técnico.</li>
                </ul>
                <p>
                  Por favor, intenta verificar tu cuenta nuevamente. Si el
                  problema persiste, no dudes en contactarnos para recibir
                  asistencia.
                </p>
                <p>Gracias por tu comprensión.</p>
                <div className="mt-4">
                  <pre className="bg-gray-100 p-4 rounded-md text-gray-800 overflow-x-auto">
                    <code className="text-sm leading-6 font-mono bg-gray-50 p-2 rounded-md  text-red-500">
                      {message.message}
                    </code>
                  </pre>
                </div>
              </div>
              <Link href="/">ir al inicio</Link>
            </>
          )}

          {message && message.status === 200 && (
            <>
              <h3 className="text-xl font-semibold">Verificación Completa</h3>
              <div className="text-sm text-gray-500">
                <p>¡Hola!</p>
                <p>
                  Tu cuenta ha sido verificada exitosamente. Ahora puedes
                  acceder a todas las funciones y servicios de nuestra
                  plataforma.
                </p>
                <p>
                  Si tienes alguna pregunta o necesitas asistencia adicional, no
                  dudes en contactarnos.
                </p>
                <p>Gracias por ser parte de nuestra comunidad.</p>
                <p>¡Disfruta de tu experiencia!</p>
              </div>
              <Link href="/">ir al inicio</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
