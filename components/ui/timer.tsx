"use client";

import React, { useEffect, useState } from "react";

function Timer1() {
  // set target date (example: 578 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(targetDate.getHours() + 15);
  targetDate.setMinutes(targetDate.getMinutes() + 51);
  targetDate.setSeconds(targetDate.getSeconds() + 19);

  const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (ms: number) => {
    if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };

    const totalSeconds = Math.floor(ms / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { d: days, h: hours, m: minutes, s: seconds };
  };

  const { d, h, m, s } = format(timeLeft);

  return (
    <div className="flex gap-4 justify-center text-center text-xl font-bold">
      <div>{d}d</div>
      <div>{h}h</div>
      <div>{m}m</div>
      <div>{s}s</div>
    </div>
  );
}

export default Timer1;