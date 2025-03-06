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

export default function AdminLoginForm() {
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
    login({ email: data.email, password: data.password });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <InputField
            name='email'
            label='Email'
            placeholder='admin@demo.com'
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
