"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export function PaymentButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full ">
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Payment
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm Payment
          </AlertDialogTitle>

          <AlertDialogDescription>
            You are about to proceed with your payment.
            Please review your order details before continuing.
          </AlertDialogDescription>
        </AlertDialogHeader>

       

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              // Payment Gateway Redirect
              console.log("Proceeding to payment...");
            }}
          >
            Pay Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}