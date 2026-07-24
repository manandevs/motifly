"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemSubtitle,
  ChoiceboxItemTitle,
} from "@/components/ui/choicebox";

const features = [
  "Block scam texts with smart AI",
  "Remove your info from sites selling it",
  "Browse online securely with VPN",
  "Monitor your identity with timely alerts",
];

const plans = [
  {
    id: "monthly",
    title: "Monthly",
    price: "$9.99",
    tag: "",
  },
  {
    id: "yearly",
    title: "Yearly",
    price: "$99.99",
    tag: "Best Value",
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);

  return (
    <div className="bg-card isolate flex h-full min-h-screen w-full flex-col px-4 py-24">
      <div className="pointer-events-none absolute top-0 left-0 isolate -z-10 h-1/2 w-full bg-[url('/radial-blur.png')] bg-cover bg-center bg-no-repeat md:bg-[url('/radial-blur.png')]" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center">
        <h1 className="mt-8 mb-4 text-3xl font-bold md:text-center md:text-4xl">
          Unlock Scam Protection, VPN, and more
        </h1>

        <ul className="mt-4 mb-8 w-full space-y-3 md:mx-auto md:max-w-xs">
          {features.map((feature, index) => (
            <li key={index} className="text-foreground/60 flex items-center text-base">
              <div className="bg-success mr-2 grid place-items-center rounded-full p-0.5">
                <CheckIcon className="size-4 p-0.5 text-white" />
              </div>

              {feature}
            </li>
          ))}
        </ul>

        <Choicebox
          className="mb-6 grid w-full grid-cols-2 justify-center gap-4"
          value={selectedPlan}
          onValueChange={setSelectedPlan}
        >
          {plans.map((plan) => (
            <ChoiceboxItem
              key={plan.id}
              value={plan.id}
              className="bg-card relative flex flex-col items-center rounded-lg px-8 py-6"
            >
              {plan.tag && (
                <span className="bg-accent border-accent-foreground absolute -top-4 left-0 rounded-full border-2 px-2 py-1 text-xs font-semibold text-white md:left-1/2 md:-translate-x-1/2">
                  {plan.tag}
                </span>
              )}

              <ChoiceboxItemHeader className="w-full text-center">
                <ChoiceboxItemTitle>{plan.title}</ChoiceboxItemTitle>

                <ChoiceboxItemSubtitle className="text-base">{plan.price}</ChoiceboxItemSubtitle>
              </ChoiceboxItemHeader>

              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
          ))}
        </Choicebox>

        <div className="text-muted-foreground mb-6 text-center text-base">Cancel anytime. Secure payment.</div>

        <Button className="mb-8 w-full" size="lg" asChild>
          <Link href="/checkout">Checkout</Link>
        </Button>

        <div className="text-muted-foreground flex justify-center gap-8 text-sm underline">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
          <Link href="/refund-policy">Refund Policy</Link>
        </div>
      </div>
    </div>
  );
}
