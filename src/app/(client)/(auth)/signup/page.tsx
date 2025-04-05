import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Card, CardContent } from "@/components/ui/card";
import { ROLE } from "@/config/constants";
import { routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import UserSignUpForm from "../_components/UserSignUpForm";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session && session?.user?.role === ROLE.ADMIN) {
    redirect(routes.privateRoutes.admin.dashboard);
  }

  if (session && session?.user?.role === ROLE.USER) {
    redirect(routes.publicRoutes.home);
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-2xl'>
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

                  <h1 className='text-2xl font-bold'>Create Account</h1>
                  <p className='text-balance text-muted-foreground'>Sign up into PickEzee platform!</p>
                </div>
              </div>

              <UserSignUpForm />

              <div className='text-center text-sm mt-5'>
                Already have an account?{" "}
                <Link href={routes.publicRoutes.login} className='text-primary underline underline-offset-4'>
                  Log in
                </Link>
              </div>
            </CardContent>
          </Card>
          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
            By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
