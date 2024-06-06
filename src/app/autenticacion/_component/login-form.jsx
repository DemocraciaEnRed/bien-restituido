import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export function LoginForm({ action, children }) {
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
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      {children}
    </form>
  );
}
