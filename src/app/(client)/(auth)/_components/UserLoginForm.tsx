"use client";

import InputField from "@/components/form/InputField";
import InputPasswordField from "@/components/form/InputPasswordField";
import { Button } from "@/components/ui/button";
import { ROLE } from "@/config/constants";
import { routes } from "@/config/routes";
import { SerializedError } from "@/redux/api/apiSlice";
import { useAdminLoginMutation } from "@/redux/auth/authApi";
import { userLoggedIn } from "@/redux/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCheck2Circle } from "react-icons/bs";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Required!").email("Valid email is required!"),
  password: z.string().min(1, "Required!"),
});

type TFormInput = z.infer<typeof loginSchema>;

export default function UserLoginForm() {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login, { data: loginResponse, isSuccess, error }] = useAdminLoginMutation();

  const methods = useForm<TFormInput>({
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
    // login({ email: data.email, password: data.password });
  };

  return (
    <FormProvider {...methods}>
      <Button variant='outline' className='w-full' type='button'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
            fill='currentColor'
          />
        </svg>
        Login with Google
      </Button>

      <div className='my-5 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
        <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
      </div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <InputField
            name='email'
            label='Email'
            placeholder='john@email.com'
            autoComplete='off'
            prefix={<FaRegEnvelope />}
          />

          <InputPasswordField
            name='password'
            label='Password'
            placeholder='123456'
            autoComplete='off'
            prefix={<FaLock />}
          />
        </div>

        <p className='text-end text-xs font-semibold my-4 select-none'>
          Fields marked with <span className='text-red-600'>*</span> are mandatory!
        </p>

        <Button type='submit' className='w-full'>
          Login
          {isSubmitting ? <ImSpinner9 className='animate-spin' /> : <BsCheck2Circle className='text-base' />}
        </Button>
      </form>
    </FormProvider>
  );
}
