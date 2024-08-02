import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm({ status, action, children }) {
  return (
    <form
      action={action}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        {status?.errors?.email && (
          <p className="text-red-500 text-xs">{status.errors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" required />
        {status?.errors?.password && (
          <p className="text-red-500 text-xs">{status.errors.password}</p>
        )}
      </div>
      {children}
    </form>
  );
}
