"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { IoAlertCircle } from "react-icons/io5";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Required!").email(),
  password: z.string().nonempty("Required!"),
});

type TFormInput = z.infer<typeof loginSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<TFormInput> = (data) => console.log(data);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent>
              <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your PickEzee Admin Account!
                    </p>
                  </div>

                  <div className="w-full space-y-1">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="secret@example.com"
                        {...register("email")}
                        className={`${
                          errors?.email &&
                          "border-destructive focus-visible:ring-destructive"
                        }`}
                        autoComplete="off"
                      />
                      {errors?.email && (
                        <span className="text-xs text-destructive flex items-center gap-x-1 mt-1">
                          <IoAlertCircle className="text-lg" />
                          {errors?.email?.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full space-y-1">
                    <Label htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={`${showPassword ? "text" : "password"}`}
                        placeholder="******"
                        {...register("password")}
                        className={`${
                          errors?.password &&
                          "border-destructive focus-visible:ring-destructive"
                        }`}
                      />
                      {errors?.password && (
                        <span className="text-xs text-destructive flex items-center gap-x-1 mt-1">
                          <IoAlertCircle className="text-lg" />
                          {errors?.password?.message}
                        </span>
                      )}
                      <div
                        className="absolute right-3 top-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <PiEye className="text-xl cursor-pointer" />
                        ) : (
                          <PiEyeClosed className="text-xl cursor-pointer" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Login <ImSpinner9 className="animate-spin" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
