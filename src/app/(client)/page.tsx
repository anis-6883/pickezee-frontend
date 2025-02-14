import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ModeToggle />
      <Link href={routes.publicRoutes.adminLogin}>
        <Button>Admin Login</Button>
      </Link>
    </div>
  );
}
