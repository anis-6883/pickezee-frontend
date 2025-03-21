import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROLE } from "@/config/constants";
import { routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoHome } from "react-icons/io5";
import AdminLoginForm from "../../../_components/AdminLoginForm";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session && session?.user?.role === ROLE.ADMIN) {
    redirect(routes.privateRoutes.admin.dashboard);
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-xl'>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden'>
            <CardContent className='p-8'>
              <div>
                <div className='flex flex-col items-center text-center mb-8'>
                  <h1 className='text-2xl font-bold'>Welcome Back</h1>
                  <p className='text-balance text-muted-foreground'>Login to your PickEzee Admin Account!</p>
                </div>

                <AdminLoginForm />

                <div className='flex justify-center mt-5'>
                  <Link href={routes.publicRoutes.home}>
                    <Button>
                      <IoHome /> Go to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
