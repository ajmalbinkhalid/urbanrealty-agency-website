// biome-ignore-all lint: no-restricted-imports
"use client";

import {
  ProgressProvider,
  useRouter as useBProgressRouter,
} from "@bprogress/next/app";
import type { ReactNode } from "react";
import { useRouter as useNextIntlRouter } from "@/i18n/navigation";

type Props = {
  children: ReactNode;
};

export default function RouteProgressProvider({ children }: Props) {
  return (
    <ProgressProvider
      color="#fc6b3d"
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}

export const useRouter = () =>
  useBProgressRouter({
    customRouter: useNextIntlRouter,
  });
