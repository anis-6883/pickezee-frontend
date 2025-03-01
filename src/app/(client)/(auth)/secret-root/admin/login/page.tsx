"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SerializedError } from "@/redux/api/apiSlice";
import { useAdminLoginMutation } from "@/redux/auth/authApi";
import { userLoggedIn } from "@/redux/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCheck2Circle } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { IoAlertCircle, IoHome } from "react-icons/io5";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Required!").email("Valid email is required!"),
  password: z.string().min(1, "Required!"),
});

type TFormInput = z.infer<typeof loginSchema>;

export default function Page() {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data: loginResponse, isSuccess, error }] = useAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (error) {
      setIsSubmitting(false);
      const myError = error as SerializedError;
      toast.error(myError?.data?.message || "Something went wrong!");
    }

    if (isSuccess) {
      dispatch(userLoggedIn(loginResponse?.data));

      signIn("credentials", {
        userData: JSON.stringify(loginResponse?.data),
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          setIsSubmitting(false);
          toast.error(callback?.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Welcome to Admin Panel!");
          if (loginResponse?.data?.role === ROLE.ADMIN) {
            replace(routes.privateRoutes.admin.dashboard);
          }
        }
      });
    }
  }, [dispatch, error, isSuccess, loginResponse, replace]);

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    setIsSubmitting(true);
    login({ email: data.email, password: data.password });
  };

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-xl'>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden'>
            <CardContent>
              <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>Welcome Back</h1>
                    <p className='text-balance text-muted-foreground'>Login to your PickEzee Admin Account!</p>
                  </div>

                  <div className='space-y-2'>
                    <div className='w-full space-y-1'>
                      <Label htmlFor='email'>
                        Email <span className='text-destructive'>*</span>
                      </Label>
                      <div>
                        <Input
                          id='email'
                          type='email'
                          placeholder='secret@example.com'
                          {...register("email")}
                          className={`${errors?.email && "border-destructive focus-visible:ring-destructive"}`}
                          autoComplete='off'
                        />
                        {errors?.email && (
                          <span className='text-xs text-destructive flex items-center gap-x-1 mt-1'>
                            <IoAlertCircle className='text-lg' />
                            {errors?.email?.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='w-full space-y-1'>
                      <Label htmlFor='password'>
                        Password <span className='text-destructive'>*</span>
                      </Label>
                      <div className='relative'>
                        <Input
                          id='password'
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder='******'
                          {...register("password")}
                          className={`${errors?.password && "border-destructive focus-visible:ring-destructive"}`}
                        />
                        {errors?.password && (
                          <span className='text-xs text-destructive flex items-center gap-x-1 mt-1'>
                            <IoAlertCircle className='text-lg' />
                            {errors?.password?.message}
                          </span>
                        )}
                        <div className='absolute right-3 top-2' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <PiEye className='text-xl cursor-pointer' />
                          ) : (
                            <PiEyeClosed className='text-xl cursor-pointer' />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className='text-end text-xs font-semibold'>
                    Fields marked with <span className='text-red-600'>*</span> are mandatory!
                  </p>

                  <Button type='submit' className='w-full'>
                    Login
                    {isSubmitting ? <ImSpinner9 className='animate-spin' /> : <BsCheck2Circle className='text-base' />}
                  </Button>

                  <div className='flex justify-center mt-5'>
                    <Link href={routes.publicRoutes.home}>
                      <Button>
                        <IoHome /> Go to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
