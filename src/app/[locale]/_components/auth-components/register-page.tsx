"use client";
import bgImage from "@public/images/bg-image.jpg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/provider/route-progress-provider";
import FormFooter from "./form-footer";
import FormHeader from "./form-header";
import RegisterForm from "./register-form";
import VerifyOtp from "./verify-otp-form";

type Step = "register" | "verify" | "done";

const RegisterPage = () => {
  const [step, setStep] = useState<Step>("register");
  const router = useRouter();

  return (
    <div className="relative z-200 overflow-hidden max-md:mx-2.5 max-md:mt-[-4rem] md:h-screen md:w-1/2">
      <FormHeader />

      <Image
        alt="bg Image"
        className="absolute top-0 z-0 object-cover max-md:rounded-[8px]"
        fill
        priority
        src={bgImage}
      />

      <div className="relative z-10 h-full w-full">
        <div className="h-full overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-20">
            {step === "register" && (
              <RegisterForm
                onDone={() => setStep("done")}
                onNext={() => setStep("verify")}
              />
            )}
            {step === "verify" && (
              <VerifyOtp
                onBack={() => setStep("register")}
                onNext={() => {
                  setStep("done");
                }}
              />
            )}
            {step === "done" && (
              <div className="flex h-full flex-col items-center justify-center py-6">
                <h2 className="font-semibold text-2xl text-gray-900">
                  Thank You For Registering!
                </h2>
                <p className="mt-3 text-gray-700">
                  Your account will be reviewed and activated shortly.
                </p>
                <p className="mt-1 text-gray-700">
                  Once activated, you will receive an email notification.
                </p>

                <Button
                  className="mt-4 cursor-pointer bg-gradient-to-b from-[#006AFF] to-[#1311BF]"
                  onClick={() => router.push("/login")}
                >
                  Go to Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Link href={"https://staging.urbanrealty-lb.com/en"}>
        <FormFooter />
      </Link>
    </div>
  );
};

export default RegisterPage;
