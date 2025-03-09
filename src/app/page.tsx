"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const GRID_SIZE = 10;
  const BASE_DELAY = 0.5;
  const NOISE = 0.05;

  const getRandomCoordinate = (): [number, number] => [
    Math.floor(Math.random() * GRID_SIZE),
    Math.floor(Math.random() * GRID_SIZE),
  ];

  const [origin, setOrigin] = useState<[number, number] | undefined>();

  useEffect(() => {
    setOrigin(getRandomCoordinate());
  }, []);

  if (!origin) return null;

  const getDistance = (row: number, col: number) => {
    return (
      Math.sqrt((row - origin[0]) ** 2 + (col - origin[1]) ** 2) /
      (10 * Math.sqrt(2))
    );
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-8">
      <div className="grid grid-cols-10 grid-rows-10 w-full max-w-[50vw] aspect-square gap-2 sm:gap-3">
        {[...Array(GRID_SIZE ** 2)].map((_, idx) => {
          const row = Math.floor(idx / GRID_SIZE);
          const col = idx % GRID_SIZE;
          const delay =
            getDistance(row, col) * BASE_DELAY + Math.random() * NOISE;
          const isOrigin = getDistance(row, col) === 0;

          return (
            <motion.div
              className="bg-neutral-500 rounded-sm"
              key={idx}
              style={{ backgroundColor: isOrigin ? "purple" : "" }}
              initial={{ opacity: isOrigin ? 1 : 0, scale: isOrigin ? 1 : 0.3 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{
                type: "spring",
                bounce: 0.5,
                delay: delay,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
