import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useTimer } from "@/hooks/use-timer";
import { SerializedError } from "@/redux/api/apiSlice";
import { useUserResendOtpMutation, useUserVerifyOtpMutation } from "@/redux/auth/authApi";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2Circle } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";

export default function OtpFormModal({
  modalState,
  setModalState,
}: {
  setModalState: (state: boolean) => void;
  modalState: boolean;
}) {
  const { replace } = useRouter();
  const { reset, timer } = useTimer(120);
  const [pin, setPin] = useState("");
  const [otpValidMsg, setOtpValidMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendOtpSubmitting, setResendOtpSubmitting] = useState(false);
  const [verifyOtp, { data, error: verifyError, isSuccess: verifySuccess }] = useUserVerifyOtpMutation();
  const [resendOtp, { error: resendError, isSuccess: resendSuccess }] = useUserResendOtpMutation();

  useEffect(() => {
    if (modalState) {
      reset();
    }
  }, [modalState, reset]);

  useEffect(() => {
    if (verifyError) {
      const myError = verifyError as SerializedError;
      setIsSubmitting(false);
      toast.error(myError?.data?.message || "Something went wrong!");
    }

    if (verifySuccess) {
      setIsSubmitting(false);
      //   dispatch(userLoggedIn(data?.data));
      toast.success(data?.message || "Otp verified & Login successfully!");

      //   signIn('credentials', {
      //     userData: JSON.stringify(verifyResponse?.data),
      //     redirect: false,
      //   }).then((callback) => {
      //     if (callback?.error) {
      //       setIsSubmitting(false);
      //       toast.error(callback?.error);
      //     }
      //     if (callback?.ok && !callback?.error) {
      //       if (verifyResponse?.data?.role === ROLE.RETAILER) {
      //         replace(routes.privateRoutes.checkout);
      //       }
      //     }
      //   });
    }
  }, [replace, verifyError, data, verifySuccess]);

  // Handle Resend Otp Submit
  const handleResendOtp = () => {
    setResendOtpSubmitting(true);
    resendOtp(undefined);
  };

  // Handler Otp Submit
  const otpSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOtpValidMsg("");

    if (typeof pin === "string") {
      if (pin.length < 6) {
        setIsSubmitting(false);
        setOtpValidMsg("Please, Enter Valid OTP!");
      } else {
        verifyOtp({ pin });
      }
    } else {
      setOtpValidMsg("Please, Enter Valid OTP!");
    }
  };

  return (
    <Dialog open={modalState} onOpenChange={() => true}>
      <DialogContent>
        <div className='absolute right-3 top-3'>
          <IoCloseOutline onClick={() => setModalState(false)} className='text-xl text-destructive cursor-pointer' />
        </div>
        <DialogHeader>
          <DialogTitle>OTP Verification</DialogTitle>
          <DialogDescription>
            We sent an OTP to your email. You have 2 minutes to complete this verification. Thank you!
          </DialogDescription>
        </DialogHeader>
        <div className='m-auto mt-4'>
          <InputOTP
            autoFocus
            value={pin}
            onChange={(value) => {
              setPin(value);
              setOtpValidMsg("");
            }}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div>{otpValidMsg && <p className='text-sm text-center text-destructive'>{otpValidMsg}</p>}</div>
        <p className='flex items-center gap-x-1 text-sm justify-center text-muted-foreground'>
          Didn{"'"}t get any OTP yet?{" "}
          {timer > 0 ? (
            <span className='text-primary'>
              {`${Math.floor(timer / 60)}`.padStart(2, "0") + ":" + `${timer % 60}`.padStart(2, "0")}
            </span>
          ) : (
            <span
              className={`${resendOtpSubmitting && "pointer-events-none"} cursor-pointer text-primary`}
              onClick={handleResendOtp}
            >
              Resend OTP
            </span>
          )}
        </p>

        <div className='flex justify-end'>
          <Button type='submit' className='mt-4' onClick={otpSubmitHandler}>
            Submit
            {isSubmitting ? <ImSpinner9 className='animate-spin' /> : <BsCheck2Circle className='text-base' />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
