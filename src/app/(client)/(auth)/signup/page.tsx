import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/config/routes";
import Link from "next/link";
import UserSignUpForm from "../_components/UserSignUpForm";

export default function Page() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-xl'>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden'>
            <CardContent className='p-8'>
              <div>
                <div className='flex flex-col items-center text-center mb-8'>
                  <h1 className='text-2xl font-bold'>Welcome Back</h1>
                  <p className='text-balance text-muted-foreground'>Sign up into PickEzee platform!</p>
                </div>
              </div>

              <UserSignUpForm />

              <div className='text-center text-sm mt-5'>
                Already have an account?{" "}
                <Link href={routes.publicRoutes.login} className='underline underline-offset-4'>
                  Login
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
