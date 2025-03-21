"use client";

import NextTopLoader from "nextjs-toploader";

export default function NprogressBar() {
  return (
    <NextTopLoader
      color={"#fb0405 !important"}
      showSpinner={false}
      height={2}
    />
  );
}
