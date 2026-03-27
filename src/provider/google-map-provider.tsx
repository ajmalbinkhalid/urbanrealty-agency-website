"use client";

import { LoadScript } from "@react-google-maps/api";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function GoogleMapProvider({ children }: Props) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      loadingElement={<div />}
    >
      {children}
    </LoadScript>
  );
}
