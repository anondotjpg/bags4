"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./Bento";
import {
  IconUpload,
  IconUsersGroup,
  IconMessageCircle2,
  IconBrandStocktwits,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { NumberTicker } from "./NumTick";

/* ---------- Generic skeleton for non-chat cards (fallback) ---------- */

const BentoSkeleton = () => (
  <div className="flex h-full w-full flex-1 min-h-[6rem] rounded-xl border border-transparent bg-neutral-900/60 bg-dot-black/[0.3] dark:border-white/[0.08] dark:bg-neutral-900/80 dark:bg-dot-white/[0.12] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
);

/* =========================================================
   LAUNCH ON BAGS: sentiment-analysis style 3-up layout
   ========================================================= */

const LaunchSkeleton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  const baseCard =
    "h-full w-1/3 rounded-2xl border border-white/12 bg-black/85 p-4 flex flex-col items-center justify-center";

  const chipBase =
    "mt-3 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-neutral-200";

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex h-full w-full flex-1 min-h-[6rem] flex-row space-x-2 rounded-xl bg-dot-black/[0.25] p-2 dark:bg-dot-white/[0.15]"
    >
      {/* Card 1 – you post the idea */}
      <motion.div variants={first} className={`${baseCard} relative`}>
        {/* Green % tickers in corners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 left-7 flex items-center"
        >
          <span className="text-[11px] font-semibold text-[#02FF40]">+</span>
          {isHovered && <NumberTicker value={124} startValue={0} direction="up" delay={0} decimalPlaces={0} className="text-[11px] font-semibold text-[#02FF40]" />}
          <span className="text-[11px] font-semibold text-[#02FF40]">%</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="absolute top-5 right-5 flex items-center"
        >
          <span className="text-[11px] font-semibold text-[#02FF40]">+</span>
          {isHovered && <NumberTicker value={89} startValue={0} direction="up" delay={0.05} decimalPlaces={0} className="text-[11px] font-semibold text-[#02FF40]" />}
          <span className="text-[11px] font-semibold text-[#02FF40]">%</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute bottom-4 left-7 flex items-center"
        >
          <span className="text-[11px] font-semibold text-[#02FF40]">+</span>
          {isHovered && <NumberTicker value={247} startValue={0} direction="up" delay={0.1} decimalPlaces={0} className="text-[11px] font-semibold text-[#02FF40]" />}
          <span className="text-[11px] font-semibold text-[#02FF40]">%</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="absolute bottom-4 right-5 flex items-center"
        >
          <span className="text-[11px] font-semibold text-[#02FF40]">+</span>
          {isHovered && <NumberTicker value={56} startValue={0} direction="up" delay={0.15} decimalPlaces={0} className="text-[11px] font-semibold text-[#02FF40]" />}
          <span className="text-[11px] font-semibold text-[#02FF40]">%</span>
        </motion.div>

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-neutral-900">
          <Image
            src="/build.png"
            alt="Builder"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-neutral-300">
          Dropped the idea on Bags.
        </p>
        <p className={chipBase}>Early</p>
      </motion.div>

      {/* Card 2 – Finn reacting */}
      <motion.div className={`${baseCard} relative z-20`}>
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-neutral-900">
          <Image
            src="/finn.jpg"
            alt="Finn"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-neutral-300">
          This could be huge ngl.
        </p>
        <p className={chipBase}>Cooking</p>
      </motion.div>

      {/* Card 3 – chat going feral */}
      <motion.div variants={second} className={baseCard}>
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-neutral-900">
          <Image
            src="/bro.jpg"
            alt="Chat"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-neutral-300">
          Chat already going feral.
        </p>
        <p className={chipBase}>Live</p>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   CONNECT: both messages styled like current build bubble
   ========================================================= */

const ConnectSkeleton = () => {
  const variantsLeft = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 3, transition: { duration: 0.2 } },
  };

  const variantsRight = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -3, transition: { duration: 0.2 } },
  };

  const chatBubble =
    "inline-flex flex-row items-start space-x-2 rounded-2xl border border-white/10 bg-black/80 px-3 py-2.5";

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full w-full flex-1 min-h-[6rem] flex-col space-y-2 rounded-xl bg-dot-black/[0.25] p-2 dark:bg-dot-white/[0.15]"
    >
      {/* you -> build.png */}
      <motion.div
        variants={variantsLeft}
        className={`${chatBubble} max-w-[75%]`}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-900">
          <Image
            src="/build.png"
            alt="You"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-xs leading-snug text-neutral-300">
          I just don&apos;t see how this is even real. I&apos;m getting paid to
          build?
        </p>
      </motion.div>

      {/* bro -> bro.jpg */}
      <motion.div
        variants={variantsRight}
        className={`${chatBubble} ml-auto max-w-[75%] justify-end`}
      >
        <p className="text-xs leading-snug text-neutral-200 text-right">
          Yes bro, Bags is the future. Let&apos;s get to it.
        </p>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-neutral-900">
          <Image
            src="/bro.jpg"
            alt="Bro"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   JOIN THE CHAT: Finn → Bro → Finn, single-line pills
   ========================================================= */

const JoinChatSkeleton = () => {
  const left = {
    initial: { x: 0 },
    animate: { x: 8, rotate: 2, transition: { duration: 0.2 } },
  };

  const right = {
    initial: { x: 0 },
    animate: { x: -8, rotate: -2, transition: { duration: 0.2 } },
  };

  const pillBase =
    "flex w-fit flex-row items-center space-x-2 rounded-full border border-white/10 bg-black/80 px-3 py-2";

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full w-full flex-1 min-h-[6rem] flex-col space-y-2 rounded-xl bg-dot-black/[0.25] p-2 dark:bg-dot-white/[0.15]"
    >
      {/* Finn #1 */}
      <motion.div variants={left} className={pillBase}>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-900">
          <Image
            src="/finn.jpg"
            alt="Finn"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="whitespace-nowrap text-[11px] leading-none text-neutral-200">
          Chat in here is insane.
        </p>
      </motion.div>

      {/* Bro */}
      <motion.div
        variants={right}
        className={`${pillBase} ml-auto justify-end`}
      >
        <p className="whitespace-nowrap text-[11px] leading-none text-neutral-200 text-right">
          The future is now.
        </p>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-neutral-900">
          <Image
            src="/bro.jpg"
            alt="Bro"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Finn #2 */}
      <motion.div variants={left} className={pillBase}>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-900">
          <Image
            src="/finn.jpg"
            alt="Finn"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="whitespace-nowrap text-[11px] leading-none text-neutral-200">
          The future is on Bags.
        </p>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   BUY & TRADE: vertical hover-to-play loop using MARQUEE_TOKENS
   ========================================================= */

const MARQUEE_TOKENS = [
  {
    id: 1,
    name: "Ralph Wiggum",
    symbol: "RALPH",
    tokenImage: "/t1.webp",
    feeEarnerUsername: "GeoffreyHuntley",
    feeEarnerAvatar: "/c1.webp",
    earningsDisplay: "$105,097.26",
    holdersDisplay: "2,542",
    changeDisplay: "+62.75%",
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
    changeDisplay: "+12.34%",
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
    changeDisplay: "-8.55%",
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
    changeDisplay: "-12.34%",
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
    changeDisplay: "+199.53%",
  },
];

const BuyTradeSkeleton = () => {
  const [hover, setHover] = useState(false);
  const loopList = [...MARQUEE_TOKENS, ...MARQUEE_TOKENS];

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900/70"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#050507] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#050507] to-transparent" />

      <div className="relative h-full w-full overflow-hidden px-3 py-2">
        <motion.div
          className="flex flex-col gap-[3px]"
          animate={hover ? { y: ["0%", "-50%"] } : { y: 0 }}
          transition={
            hover
              ? { duration: 14, repeat: Infinity, ease: "linear" }
              : { duration: 0.3, ease: "easeOut" }
          }
        >
          {loopList.map((token, idx) => {
            const isNegative =
              token.changeDisplay &&
              token.changeDisplay.trim().startsWith("-");
            const changeColor = isNegative
              ? "text-red-400"
              : "text-[#02FF40]";

            return (
              <div
                key={`${token.id}-${idx}`}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/85 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-md bg-neutral-900">
                    <Image
                      src={token.tokenImage}
                      alt={token.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-neutral-50">
                      {token.symbol}
                      <span className="text-[10px] font-normal text-neutral-400">
                        {" "}
                        · {token.name}
                      </span>
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {token.earningsDisplay} · {token.holdersDisplay} holders
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[12px] font-semibold ${changeColor}`}
                  >
                    {token.changeDisplay}
                  </span>
                  <span className="hidden text-[10px] text-neutral-400 sm:inline">
                    @{token.feeEarnerUsername}
                  </span>
                  <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/15 bg-neutral-900">
                    <Image
                      src={token.feeEarnerAvatar}
                      alt={token.feeEarnerUsername}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   Content config
   ========================================================= */

const BENTO_ITEMS = [
  {
    title: "Launch on Bags",
    description:
      "Raise money and build community for whatever you're working on.",
    header: <LaunchSkeleton />,
    className: "md:col-span-2",
    icon: <IconUpload className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "Connect",
    description: "Get paid for directing your favorite builders to launch.",
    header: <ConnectSkeleton />,
    className: "md:col-span-1",
    icon: <IconUsersGroup className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "Join the Chat",
    description: "Join the squad on the Bags app to keep up.",
    header: <JoinChatSkeleton />,
    className: "md:col-span-1",
    icon: <IconMessageCircle2 className="h-4 w-4 text-neutral-400" />,
  },
  {
    title: "Buy and Trade",
    description: "Support your favorite projects and fund the future.",
    header: <BuyTradeSkeleton />,
    className: "md:col-span-2",
    icon: <IconBrandStocktwits className="h-4 w-4 text-neutral-400" />,
  },
];

/* =========================================================
   Exported Bags bento section
   ========================================================= */

export function BagsBento() {
  return (
    <BentoGrid className="mx-auto max-w-5xl md:auto-rows-[20rem]">
      {BENTO_ITEMS.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}