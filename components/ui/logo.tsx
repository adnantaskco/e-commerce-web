"use client";

import useSWR from "swr";
import { currencyFetcher } from "@/lib/currencyFetcher";

export function UseLogo() {
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/ecommerce-settings",
    currencyFetcher
  );

  const logo = data?.data?.logo || "";

  return {
    logo,
    error,
    isLoading,
  };
}