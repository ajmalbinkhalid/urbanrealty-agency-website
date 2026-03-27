"use client";
import bgImage from "@public/images/bg-image.jpg";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "@/provider/route-progress-provider";
import FormFooter from "./form-footer";
import LoginForm from "./login-form";
import VerifyOtp from "./verify-otp-form";
import FormHeader from "./form-header";
import Link from "next/link";

type Step = "login" | "verify" | "done";

const LoginPage = () => {
  const [step, setStep] = useState<Step>("login");
  const router = useRouter();

  return (
    <div className="relative  md:h-screen max-md:mt-[-4rem] z-[999999] max-md:mx-2.5 md:w-1/2 overflow-hidden">
      <FormHeader />
      <Image
        alt="bg Image"
        className="absolute max-md:rounded-[8px] top-0 z-0 object-cover"
        src={bgImage}
      />
      <div className="relative z-10 h-full  w-full">
        <div className="h-full overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-16">
            {step === "login" && <LoginForm onNext={() => setStep("verify")} />}
            {step === "verify" && (
              <VerifyOtp
                onBack={() => setStep("login")}
                onNext={() => {
                  setStep("done");
                  router.push("/");
                }}
              />
            )}
            {step === "done" && (
              <div className="flex h-full flex-col items-center justify-center py-6">
                <h2 className="font-semibold text-2xl text-gray-900">
                  Login Successful!
                </h2>
                <p className="mt-2 text-gray-700">
                  Redirecting to your dashboard...
                </p>

                <Spinner className="mt-4 size-7" />
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

export default LoginPage;
