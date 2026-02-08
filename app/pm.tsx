"use client";

import React, { useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { motion, type MotionProps } from "motion/react";

import { AvatarCircles } from "./components/Avatar";
import { cn } from "@/lib/utils";
import { DottedMap } from "./components/DottedMap";

const shinyAnimationProps: MotionProps = {
  initial: { "--x": "100%" },
  animate: { "--x": "-100%" },
  whileTap: { scale: 0.97 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as MotionProps;

const EARNINGS_START = 21_000_000;

const formatHolderCount = (count: string): string => {
  const num = parseInt(count.replace(/,/g, ""), 10);
  if (isNaN(num)) return count;
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.?0+$/, "") + "k";
  }
  return count;
};

const LEFT_TOKENS = [
  {
    id: 1,
    symbol: "RALPH",
    tokenImage: "/ral.webp",
    earningsDisplay: "$225,080",
    holdersDisplay: "6,427",
  },
  {
    id: 2,
    symbol: "GSD",
    tokenImage: "/gsd.webp",
    earningsDisplay: "$70,449",
    holdersDisplay: "2,900",
  },
  {
    id: 3,
    symbol: "SKILLSTACK",
    tokenImage: "/ss.webp",
    earningsDisplay: "$15,398",
    holdersDisplay: "991",
  },
];

const RIGHT_TOKENS = [
  {
    id: 4,
    symbol: "NPM",
    tokenImage: "/n.webp",
    earningsDisplay: "$139,936",
    holdersDisplay: "3,737",
  },
  {
    id: 5,
    symbol: "X1XHLOL",
    tokenImage: "/xh.webp",
    earningsDisplay: "$53,313",
    holdersDisplay: "1,550",
  },
  {
    id: 6,
    symbol: "GAS",
    tokenImage: "/gas.webp",
    earningsDisplay: "$309,309",
    holdersDisplay: "9,222",
  },
];

type MarqueeToken = {
  id: number;
  name: string;
  symbol: string;
  tokenImage: string;
  feeEarnerUsername: string;
  feeEarnerAvatar: string;
  earningsDisplay: string;
  holdersDisplay: string;
};

const MARQUEE_TOKENS: MarqueeToken[] = [
  {
    id: 1,
    name: "Ralph Wiggum",
    symbol: "RALPH",
    tokenImage: "/t1.webp",
    feeEarnerUsername: "GeoffreyHuntley",
    feeEarnerAvatar: "/c1.webp",
    earningsDisplay: "$105,097.26",
    holdersDisplay: "2,542",
  },
  {
    id: 2,
    name: "Vibe Virtual Machine",
    symbol: "VVM",
    tokenImage: "/z.webp",
    feeEarnerUsername: "thekaranchawla",
    feeEarnerAvatar: "/c2.webp",
    earningsDisplay: "$28,952",
    holdersDisplay: "775",
  },
  {
    id: 3,
    name: "Nyan Cat",
    symbol: "NYAN",
    tokenImage: "/t3.webp",
    feeEarnerUsername: "PRguitarman",
    feeEarnerAvatar: "/c3.webp",
    earningsDisplay: "$400,308",
    holdersDisplay: "3,579",
  },
  {
    id: 4,
    name: "Natecoin",
    symbol: "NATE",
    tokenImage: "/t4.webp",
    feeEarnerUsername: "Nate_Esparza",
    feeEarnerAvatar: "/c4.webp",
    earningsDisplay: "$18,309",
    holdersDisplay: "430",
  },
  {
    id: 5,
    name: "Claude Memory",
    symbol: "CMEM",
    tokenImage: "/t5.webp",
    feeEarnerUsername: "Claude_Memory",
    feeEarnerAvatar: "/c5.webp",
    earningsDisplay: "$21,058",
    holdersDisplay: "768",
  },
];

const AVATAR_URLS = MARQUEE_TOKENS.map((token) => ({
  imageUrl: token.feeEarnerAvatar,
  profileUrl: `https://twitter.com/${token.feeEarnerUsername}`,
}));

const FloatingTokenCard = ({
  token,
  className,
  animationDelay = 0,
}: {
  token: {
    id: number;
    symbol: string;
    tokenImage: string;
    earningsDisplay: string;
    holdersDisplay: string;
  };
  className?: string;
  animationDelay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: animationDelay,
      ease: [0.23, 1, 0.32, 1],
    }}
    className={cn(
      "absolute w-[180px] rounded-2xl bg-[#141414] border border-white/[0.08] p-5",
      "hover:border-white/15 hover:bg-[#0e0e10] transition-all duration-300",
      className,
    )}
  >
    <div className="absolute right-3 top-3 flex items-center gap-1 text-xs text-neutral-500">
      <svg className="h-3 w-3 fill-neutral-500" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>{formatHolderCount(token.holdersDisplay)}</span>
    </div>
    <div className="mb-3 flex justify-center">
      <div className="h-14 w-14 overflow-hidden rounded-full bg-white/5 shadow-lg">
        <img
          src={token.tokenImage}
          alt={token.symbol}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
    <p className="mb-2 text-center text-sm font-semibold tracking-wide text-white">
      {token.symbol}
    </p>
    <p className="text-center text-lg text-neutral-500">
      <span className="font-medium text-neutral-300">
        {token.earningsDisplay}
      </span>{" "}
      <span className="text-base">raised</span>
    </p>
  </motion.div>
);

export default function Home() {
  const earningsSpanRef = useRef<HTMLSpanElement | null>(null);
  const earningsValueRef = useRef<number>(EARNINGS_START);

  useEffect(() => {
    const node = earningsSpanRef.current;
    if (!node) return;

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 401) + 300;
      earningsValueRef.current += increment;
      node.textContent = `$${earningsValueRef.current.toLocaleString(
        "en-US",
      )}+`;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0d0d0f] text-white">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden px-6">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* 👇 This is the only part changed to properly center the dotted map */}
          <div className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2">
            <DottedMap />
          </div>
          <div className="absolute inset-0 bg-[#0d0d0f]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0f]/60 to-[#0d0d0f]" />
        </div>

        {/* FLOATING CARDS – symmetric curl, true-centered vertically */}
        {/* Left side */}
        <FloatingTokenCard
          token={LEFT_TOKENS[0]}
          className="hidden xl:block top-1/2 -translate-y-1/2 -mt-[220px] left-[calc(50%-480px)] -rotate-6"
          animationDelay={0.1}
        />
        <FloatingTokenCard
          token={LEFT_TOKENS[1]}
          className="hidden xl:block top-1/2 -translate-y-1/2 left-[calc(50%-520px)] rotate-3"
          animationDelay={0.25}
        />
        <FloatingTokenCard
          token={LEFT_TOKENS[2]}
          className="hidden xl:block top-1/2 -translate-y-1/2 mt-[220px] left-[calc(50%-460px)] -rotate-3"
          animationDelay={0.4}
        />

        {/* Right side (now vertically even with left) */}
        <FloatingTokenCard
          token={RIGHT_TOKENS[0]}
          className="hidden xl:block top-1/2 -translate-y-1/2 -mt-[220px] left-[calc(50%+300px)] rotate-6"
          animationDelay={0.15}
        />
        <FloatingTokenCard
          token={RIGHT_TOKENS[1]}
          className="hidden xl:block top-1/2 -translate-y-1/2 left-[calc(50%+340px)] -rotate-3"
          animationDelay={0.3}
        />
        <FloatingTokenCard
          token={RIGHT_TOKENS[2]}
          className="hidden xl:block top-1/2 -translate-y-1/2 mt-[220px] left-[calc(50%+280px)] rotate-3"
          animationDelay={0.45}
        />

        {/* HERO CONTENT – centered on same 50% as cards */}
        <div className="absolute left-1/2 top-1/2 z-10 max-w-3xl -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="relative inline-flex items-center">
            <div className="mb-5 inline-flex items.center rounded-full border border-white/10 bg-[rgba(0,0,0,0.9)] px-5 py-3 shadow-lg backdrop-blur-sm">
              <span
                ref={earningsSpanRef}
                className="text-sm font-semibold tracking-[0.02em] text-white"
              >
                ${EARNINGS_START.toLocaleString("en-US")}+
              </span>
              <span className="ml-1 text-sm text-neutral-300">
                in creator earnings
              </span>
            </div>

            <div className="pointer-events-auto absolute -right-6 -top-6 hidden md:block">
              <AvatarCircles
                numPeople={MARQUEE_TOKENS.length}
                avatarUrls={AVATAR_URLS}
                className="scale-75"
              />
            </div>
          </div>

          <h1 className="text-4xl font-semibold leading-[0.95] tracking-tight text.white md:text-[72px]">
            Raise money
            <br />
            for anything
          </h1>

          <p className="mt-6 text-base text-neutral-400 md:text-lg">
            Verify. Grow. Earn.
          </p>

          <motion.a
            href="https://bags.fm/launch"
            className="group relative mt-6 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#02FF40] px-10 py-3 text-base font-semibold text.black shadow-[0_6px_0_#00cc33] transition-all duration-150 ease-in-out md:text-lg hover:-translate-y-[2px] hover:shadow-[0_8px_0_#00cc33] active:translate-y-[6px] active:shadow-none"
            {...shinyAnimationProps}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full text-black"
              style={{
                backgroundImage:
                  "linear-gradient(-75deg, transparent calc(var(--x) + 20%), rgba(255,255,255,0.5) calc(var(--x) + 25%), transparent calc(var(--x) + 100%))",
              }}
            />
            <FiPlus className="relative mr-2 text-3xl text-black" />
            <span className="relative font-bold text-black">raise now</span>
          </motion.a>
        </div>
      </section>
    </main>
  );
}
