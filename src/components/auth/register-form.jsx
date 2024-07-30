import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function RegisterForm({ action, children }) {
  return (
    <form
      action={action}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <Label htmlFor="username">Nombre de usuario</Label>
        <Input id="username" name="username" type="text" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      {children}
    </form>
  );
}
