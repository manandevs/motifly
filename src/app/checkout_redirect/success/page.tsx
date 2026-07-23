"use client";

import { ArrowLeft } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <div className="mx-auto h-screen w-full max-w-7xl px-4 py-40">
      <a href={"/"} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Return to app
      </a>
    </div>
  );
}
