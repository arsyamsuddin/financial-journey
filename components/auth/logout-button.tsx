import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logout} className="shrink-0">
      <Button type="submit" variant="outline" size="sm">
        Logout
      </Button>
    </form>
  );
}
