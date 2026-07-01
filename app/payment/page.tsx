"use client"
import { FieldDemo } from "@/components/ui/paymentfield";
import { useRouter } from "next/navigation";

import React from "react";

function Page() {



  const router = useRouter();
  
    const handlePlaceOrder = () => {
    // save order, api call, etc.
  
    router.push("/order-success");
  };
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="mx-auto w-full max-w-2xl rounded-lg border p-6 shadow-sm">
          <h2 className="mb-6text-text-primary text-2xl font-bold">
            Payment Details
          </h2>

          <FieldDemo />
        </div>
      </div>
    </section>
  );
}

export default Page;