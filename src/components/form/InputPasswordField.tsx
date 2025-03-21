import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoAlertCircle } from "react-icons/io5";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InputPasswordField({
  name,
  label,
  placeholder,
  required = true,
  disabled = false,
  prefix,
  className = "",
  autoComplete = "new-password",
}: {
  name: string;
  label: string | React.ReactNode;
  placeholder?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  autoComplete?: "off" | "new-password";
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-full space-y-1'>
      <Label htmlFor={name}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      <div className='relative flex items-center'>
        {prefix && <div className='absolute left-3 flex h-full items-center'>{prefix}</div>}
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`${className} ${prefix && "pl-10"} pr-10 ${
            errors[name] && "border-destructive focus-visible:ring-destructive"
          }`}
        />
        <div
          className='absolute right-3 flex h-full items-center cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <PiEye className='text-xl' /> : <PiEyeClosed className='text-xl' />}
        </div>
      </div>
      {errors[name] && (
        <span className='text-xs text-destructive flex items-center gap-x-1 mt-1'>
          <IoAlertCircle className='text-lg' />
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
}
