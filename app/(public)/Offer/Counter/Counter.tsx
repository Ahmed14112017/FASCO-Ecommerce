"use client";

import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";

function getTimeRemaining() {
  const targetDate = new Date("2027-12-31T23:59:59").getTime();

  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
export default function Counter() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  if (!mounted) return null;
  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hr", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg flex flex-col gap-6">
      <h3 className="font-semibold text-center mb-3">Deals Of The Month</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
        sollicitudin{" "}
      </p>
      <Button className="py-2 px-6  rounded-md">Buy Now</Button>
      <div className="flex gap-3">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="bg-white text-black w-12 h-12 flex items-center justify-center text-lg font-bold rounded">
              {String(unit.value)}
            </div>
            <span className="text-xs mt-1 text-gray-500">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
