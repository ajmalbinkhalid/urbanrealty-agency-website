"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/provider/route-progress-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!(isLoading || isLoggedIn)) {
      router.push("/login");
    }
  }, [isLoggedIn, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background font-semibold text-[#5f5b70] text-lg">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background font-semibold text-[#5f5b70] text-lg">
        <h6 className="text-black">Redirecting to login...</h6>
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(#ffffff66,#ffffff66),url(/images/bg-image.jpg)] bg-cover bg-no-repeat">
      <div className="max-px-web clamp-[pb,2.5rem,5.9375rem] clamp-[pt,6rem,10rem]">
        {children}
      </div>
    </div>
  );
}
