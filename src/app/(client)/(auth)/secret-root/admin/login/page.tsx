import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Card, CardContent } from "@/components/ui/card";
import { ROLE } from "@/config/constants";
import { routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import AdminLoginForm from "../../../_components/AdminLoginForm";
import DotPattern from "../../../_components/DotPattern";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session && session?.user?.role === ROLE.ADMIN) {
    redirect(routes.privateRoutes.admin.dashboard);
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <DotPattern />
      <div className='w-full max-w-sm md:max-w-xl'>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden'>
            <CardContent className='p-8'>
              <div>
                <div className='flex flex-col items-center text-center mb-8'>
                  <div className='mb-5'>
                    <Link href='/'>
                      <p className='flex items-center justify-center gap-1 text-center text-2xl font-bold text-primary'>
                        <FaCartShopping className='-rotate-[25deg]' /> PickEzee
                      </p>
                    </Link>
                  </div>

                  <h1 className='text-2xl font-bold'>Welcome Back</h1>
                  <p className='text-balance text-muted-foreground'>Login to your PickEzee Admin Account!</p>
                </div>

                <AdminLoginForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
