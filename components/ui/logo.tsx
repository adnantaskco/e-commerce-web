"use client";

import useSWR from "swr";
import { currencyFetcher } from "@/lib/currencyFetcher";

export function useLogo() {
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/settings",
    currencyFetcher
  );

  // Extract logo URL safely from data object
  const logo = data?.data?.logo || "";

  return {
    logo,
    error,
    isLoading,
  };
}