"use client";

import { useEffect, useState } from "react";

export default function Timer1() {
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-12-31T23:59:59").getTime();
    const now = new Date().getTime();

    const difference = targetDate - now;

    return {
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / (1000 * 60)) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render on server
  if (!mounted) return null;

  return (
    <div className="flex gap-4 text-white font-semibold">
      <div>{timeLeft.h}h</div>
      <div>{timeLeft.m}m</div>
      <div>{timeLeft.s}s</div>
    </div>
  );
}