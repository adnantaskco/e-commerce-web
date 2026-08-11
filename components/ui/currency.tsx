
"use client";

import useSWR from "swr";
import { currencyFetcher } from "@/lib/currencyFetcher";

export function UseCurrency() {
  const {
    data,
    error,
    isLoading,
  } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/settings",
    currencyFetcher
  );

  const currency = data?.data?.currency || "";

  return {
    currency,
    error,
    isLoading,
  };
}

