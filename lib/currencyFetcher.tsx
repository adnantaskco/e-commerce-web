// Self-contained fetcher specifically for currency/settings
export const currencyFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch settings");
    return res.json();
  });