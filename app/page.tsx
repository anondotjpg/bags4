"use client";

import Image from "next/image";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  motion,
  type MotionProps,
  useScroll,
  AnimatePresence,
} from "motion/react";

import { AvatarCircles } from "./components/Avatar";
import { cn } from "@/lib/utils";
import { DottedMap } from "./components/DottedMap";
import { Iphone } from "./components/Iphone";

import { useEffect, useRef, useState } from "react";
import { MagicCard } from "./components/MagicCard";
import DitherShader from "./components/dither-shader";
import { Marqueee } from "./components/Marq";

// ElevenLabs Matrix + presets (your local implementation using useId)
import { Matrix, digits, wave } from "./components/Matrix";

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

// Helper function to format holder counts (e.g., 3876 → "3.88k")
const formatHolderCount = (count: string): string => {
  const num = parseInt(count.replace(/,/g, ""), 10);
  if (isNaN(num)) return count;
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.?0+$/, "") + "k";
  }
  return count;
};

const VARIABLE_WORDS = ["project", "business", "app", "cause", "anything"];

// 🔢 Daily flex number (only shown via Matrix digits)
const FUNDED_TODAY = 1284;
const FUNDED_TODAY_DIGITS = FUNDED_TODAY.toString().split("");

// rotating word in Bags Mobile card
function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % VARIABLE_WORDS.length),
      2200,
    );
    return () => clearInterval(interval);
  }, []);

  return <span>{VARIABLE_WORDS[index]}</span>;
}

// Token data for floating cards
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

const reviews = [
  {
    name: "Jukez",
    username: "@jukezpilled",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "jukez.jpg",
  },
  {
    name: "Elon",
    username: "@elonmusk",
    body: "Bags is the best way to raise money online. period.",
    img: "elon.jpg",
  },
  {
    name: "Finn",
    username: "@finnbags",
    body: "We’re funding the future. We're also about to give cracked @jukezpilled a job.",
    img: "finn.jpg",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative flex-shrink-0 w-full max-w-[260px] cursor-pointer overflow-hidden rounded-xl border p-4",
      "border-gray-950/[.10] bg-gray-950/[.03] hover:bg-gray-950/[.08]",
      "dark:border-gray-50/[.10] dark:bg-gray-50/[.08] dark:hover:bg-gray-50/[.14]",
      "transition-colors duration-200 ease-out",
    )}
    style={{ willChange: "transform" }}
  >
    <div className="flex flex-row items-center gap-2">
      <div className="relative h-8 w-8 shrink-0">
        <img
          src={img}
          alt=""
          draggable={false}
          width={32}
          height={32}
          className="block h-8 w-8 rounded-full object-cover"
        />
        <div className="absolute -bottom-1 -right-1 z-10 grid h-[16px] w-[16px] shrink-0 place-items-center rounded-full bg-[#0d0d0f]">
          <img
            src="/ver.webp"
            alt=""
            draggable={false}
            width={12}
            height={12}
            className="block h-[12px] w-[12px] object-contain"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <figcaption className="text-sm font-medium text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium text-white/40">{username}</p>
      </div>
    </div>

    <blockquote className="mt-2 min-h-[48px] text-sm leading-snug text-neutral-200">
      {body}
    </blockquote>
  </figure>
);

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-[80%] flex-row items-center justify-center gap-4 overflow-hidden md:my-32">
      <Marqueee pauseOnHover vertical className="w-1/4 [--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={`col1-${review.username}`} {...review} />
        ))}
      </Marqueee>
      <Marqueee
        reverse
        pauseOnHover
        vertical
        className="w-1/4 [--duration:22s]"
      >
        {reviews.map((review) => (
          <ReviewCard key={`col2-${review.username}`} {...review} />
        ))}
      </Marqueee>
      <Marqueee
        reverse
        pauseOnHover
        vertical
        className="w-1/4 [--duration:18s]"
      >
        {reviews.map((review) => (
          <ReviewCard key={`col3-${review.username}`} {...review} />
        ))}
      </Marqueee>
      <Marqueee pauseOnHover vertical className="w-1/4 [--duration:24s]">
        {reviews.map((review) => (
          <ReviewCard key={`col4-${review.username}`} {...review} />
        ))}
      </Marqueee>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0d0d0f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0d0d0f] to-transparent" />
    </div>
  );
}

// Static Floating Token Card Component (used only in hero)
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
      "absolute w-[180px] rounded-2xl bg-[#141414] border border-white/[0.08] p-5 shadow-2xl shadow-black/60",
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

// ---------------------------------------------------------------------------
// Persona data (creator / trader / connector)
// ---------------------------------------------------------------------------

const ROLE_SECTIONS = [
  {
    key: "creator",
    label: "create",
    eyebrow: "launch in seconds",
    title: "Launch a coin and earn royalties forever.",
    body: "Turn your ideas, audience, or projects into tradeable tokens. Verify with your socials, build community funding, and get 1% of all trading volume routed back to you.",
    footer: "",
  },
  {
    key: "trader",
    label: "trade",
    eyebrow: "trade what's trending",
    title: "Discover and trade the next big thing.",
    body: "Access transparent launches, real-time metrics, and organic flow on Solana. Buy/sell coins and creator tokens before the timeline catches up.",
    footer: "",
  },
  {
    key: "connector",
    label: "connect",
    eyebrow: "build bridges onchain",
    title: "Connect creators to Bags.",
    body: "Sign up creators to Bags using your ref link and earn 50% of protocol fees when they launch. forever.",
    footer: "",
  },
] as const;

function PersonaCopy({
  activeIndex,
  onTabSelect,
}: {
  activeIndex: number;
  onTabSelect?: (index: number) => void;
}) {
  return (
    <div className="flex w-full max-w-sm flex-col text-left">
      {/* Tabs (fixed widths so nothing jiggles) */}
      <div
        className="inline-flex w-full items-center rounded-full bg-white/5 p-1 text-[14px] font-medium text-neutral-400"
        role="tablist"
        aria-label="persona tabs"
      >
        {ROLE_SECTIONS.map((r, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabSelect?.(index)}
              className={cn(
                "flex-1 rounded-full px-3 py-1.5 text-center transition-colors duration-200",
                isActive
                  ? "bg-white text-black shadow-[0_0_0_1px_rgba(0,0,0,0.85)]"
                  : "hover:text-white/80",
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      {/* Fixed-height stage so copy NEVER shifts (content crossfades, layout stays) */}
      <div className="relative mt-4 min-h-[190px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={ROLE_SECTIONS[activeIndex].key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <p className="text-xs font-medium text-[#02FF40]/90">
              {ROLE_SECTIONS[activeIndex].eyebrow}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
              {ROLE_SECTIONS[activeIndex].title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-300">
              {ROLE_SECTIONS[activeIndex].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scroll-driven persona section (no floating cards, no floor.webp here)
// ---------------------------------------------------------------------------

// --- replace your PersonaScrollSection() with this version ---
// (everything else in the file can stay exactly the same)

function PersonaScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  // manual override lock (so scroll doesn't instantly overwrite clicks)
  const manualLockUntilRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll drives activeIndex unless user clicked recently
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (Date.now() < manualLockUntilRef.current) return;

      const segments = ROLE_SECTIONS.length; // 3
      const idx = Math.min(
        segments - 1,
        Math.floor(Math.max(0, Math.min(0.999999, value)) * segments),
      );
      setActiveIndex(idx);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Detect "ready" (sticky container centered in viewport) -> fade side panels
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    let raf = 0;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const dist = Math.abs(centerY - viewportCenter);

      // within 70px of perfect center = ready
      setIsReady(dist < 70);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onTabSelect = (index: number) => {
    setActiveIndex(index);
    manualLockUntilRef.current = Date.now() + 1200; // lock scroll updates briefly
  };

  return (
    <section ref={sectionRef} className="relative h-[320vh] -mt-40">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-20"
      >
        <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* Left: persona copy (lg+ only) */}
          <motion.div
            className="hidden justify-end lg:flex"
            initial={false}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady ? 0 : 10,
              filter: isReady ? "blur(0px)" : "blur(3px)",
              pointerEvents: isReady ? "auto" : "none",
            }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-sm">
              <PersonaCopy activeIndex={activeIndex} onTabSelect={onTabSelect} />
            </div>
          </motion.div>

          {/* Center: iPhone perfectly centered */}
          <div className="flex justify-center">
            <div className="relative w-[320px] md:w-[434px]">
              <Iphone src="flex3.png" />
            </div>
          </div>

          {/* Right: QR + download button (lg+ only) */}
          <motion.div
            className="hidden lg:flex justify-start"
            initial={false}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady ? 0 : 10,
              filter: isReady ? "blur(0px)" : "blur(3px)",
              pointerEvents: isReady ? "auto" : "none",
            }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-sm">
              <div className="p-4">
                <a
                  href="https://apps.apple.com/us/app/bags-trade-crypto-memes/id6473196333"
                  className="block"
                >
                  <Image
                    src="/bags-ios-qr.png"
                    alt="Scan to download Bags on iOS"
                    width={220}
                    height={220}
                    className="mx-auto w-[220px] rounded-xl border border-white/10"
                    priority={false}
                  />
                </a>

                <a
                  href="https://bags.fm/app-links"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#02FF40]/100 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,255,90,0.10)] transition-colors duration-150 hover:bg-[#02FF40]/90"
                >
                  download now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

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
      {/* HEADER */}
      <header className="border-b-2 border-white/5 bg-[#0d0d0f]">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-4 md:px-7">
          <div className="flex items-center">
            <Image
              src="/bags.png"
              alt="Bags logo"
              width={36}
              height={36}
              className="h-9 w-9"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center rounded-full bg-[#141414] px-5 py-2 shadow-[0_0_0_2px_rgba(255,255,255,0.07),0_0_0_1px_rgba(0,0,0,0.85)_inset,0_0_10px_rgba(0,0,0,0.5)_inset]">
              <FiSearch className="mr-2.5 text-[17px] text-neutral-600" />
              <input
                type="text"
                placeholder="Search by CA or ticker"
                className="w-full bg-transparent text-[15px] text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-sm md:flex">
            <a
              href="https://bags.fm/how-it-works"
              className="cursor-pointer text-[14px] text-neutral-300 transition-colors hover:text-white"
            >
              <span>[how it works]</span>
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="https://bags.fm/launch"
              className="hidden transform cursor-pointer items-center justify-center rounded-full bg-[#02FF40] px-7 py-2.5 text-sm font-semibold text-black transition-transform duration-150 ease-in-out hover:scale-[1.02] md:inline-flex"
            >
              <FiPlus className="mr-2 text-[19px]" />
              <span className="font-bold">create</span>
            </a>
            <a
              href="https://bags.fm/login"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white/100 px-7 py-2.5 text-sm font-bold text-black transition-colors duration-150 hover:bg-white/90"
            >
              <span>log in</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-44">
        {/* HERO dotted map background – zoomed */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-1/2 top-[45%] h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2">
            <DottedMap />
          </div>
          <div className="absolute inset-0 bg-[#0d0d0f]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0f]/60 to-[#0d0d0f]" />
        </div>

        {/* LEFT FLOATING CARDS - positioned relative to center (HERO ONLY) */}
        <FloatingTokenCard
          token={LEFT_TOKENS[0]}
          className="hidden xl:block top-[8%] left-[calc(50%-480px)] -rotate-6"
          animationDelay={0.1}
        />
        <FloatingTokenCard
          token={LEFT_TOKENS[1]}
          className="hidden xl:block top-[38%] left-[calc(50%-520px)] rotate-3"
          animationDelay={0.25}
        />
        <FloatingTokenCard
          token={LEFT_TOKENS[2]}
          className="hidden xl:block top-[68%] left-[calc(50%-460px)] -rotate-3"
          animationDelay={0.4}
        />

        {/* RIGHT FLOATING CARDS - positioned relative to center (HERO ONLY) */}
        <FloatingTokenCard
          token={RIGHT_TOKENS[0]}
          className="hidden xl:block top-[5%] left-[calc(50%+300px)] rotate-6"
          animationDelay={0.15}
        />
        <FloatingTokenCard
          token={RIGHT_TOKENS[1]}
          className="hidden xl:block top-[35%] left-[calc(50%+340px)] -rotate-3"
          animationDelay={0.3}
        />
        <FloatingTokenCard
          token={RIGHT_TOKENS[2]}
          className="hidden xl:block top-[65%] left-[calc(50%+280px)] rotate-3"
          animationDelay={0.45}
        />

        <div className="z-10 -mt-16 max-w-3xl text-center">
          <div className="relative inline-flex items-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-[rgba(0,0,0,0.9)] px-5 py-3 shadow-lg backdrop-blur-sm">
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

          <h1 className="text-4xl font-semibold leading-[0.9] tracking-tight text-white md:text-[72px]">
            We&apos;re funding
            <br />
            your ideas
          </h1>

          <p className="mt-6 text-base text-neutral-400 md:text-lg">
            Verify. Grow. Earn.
          </p>

          <motion.a
            href="https://bags.fm/launch"
            className="group relative mt-6 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#02FF40] px-10 py-3 text-base font-semibold text-black shadow-[0_6px_0_#00cc33] transition-all duration-150 ease-in-out md:text-lg hover:-translate-y-[2px] hover:shadow-[0_8px_0_#00cc33] active:translate-y-[6px] active:shadow-none"
            {...shinyAnimationProps}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(-75deg, transparent calc(var(--x) + 20%), rgba(255,255,255,0.5) calc(var(--x) + 25%), transparent calc(var(--x) + 100%))",
              }}
            />
            <FiPlus className="relative mr-2 text-3xl" />
            <span className="relative font-bold">get funded</span>
          </motion.a>
        </div>
      </section>

      {/* SCROLL-DRIVEN PERSONA + IPHONE SECTION (no floor, no floats) */}
      <PersonaScrollSection />

      {/* BOTTOM SECTION – marquee + Bags Mobile card with floor.webp at very bottom */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-16 pt-24">
        {/* floor.webp way at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 md:h-72">
          <DitherShader
            src="floor.webp"
            gridSize={3}
            ditherMode="bayer"
            colorMode="grayscale"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-[#0d0d0f]/75" />
          <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0f] via-[#0d0d0f]/60 to-transparent" />
        </div>

        {/* removed extra “you are clicks away” text */}

        <div className="relative z-30 mt-4 mb-8 hidden w-full max-w-5xl justify-center lg:flex">
          <Marquee3D />
        </div>

        <div className="relative z-30 mt-10 w-full max-w-5xl">
          <MagicCard className="mx-auto w-full">
            <div className="flex w-full flex-col items-center justify-between gap-2 px-6 py-4 md:flex-row md:items-start md:gap-10 md:px-10 md:py-7 md:pb-8">
              <div className="flex w-full items-center gap-4 md:flex-1 md:items-start md:gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/90 md:h-16 md:w-16">
                  <Image
                    src="/b.png"
                    alt="Bags Mobile icon"
                    width={48}
                    height={48}
                    className="h-10 w-10 md:h-11 md:w-11"
                  />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-white md:text-lg">
                    Bags Mobile
                  </p>
                  <p className="text-xs text-neutral-300 md:hidden">
                    Get funded for your future
                  </p>
                  <p className="hidden text-xs text-neutral-300 md:block md:text-sm lg:text-base">
                    Get funded for your <RotatingWord />
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-500 md:text-xs">
                    Available on iOS and Android
                  </p>
                </div>
              </div>

              <div className="flex w-full justify-center md:w-auto md:justify-end">
                <a
                  href="https://apps.apple.com/us/app/bags-trade-crypto-memes/id6473196333"
                  className="hidden lg:block"
                >
                  <Image
                    src="/bags-ios-qr.png"
                    alt="Scan to download Bags on iOS"
                    width={120}
                    height={120}
                    className="rounded-md border border-white/10"
                  />
                </a>
              </div>

              <a
                href="https://bags.fm/app-links"
                className="mt-1 inline-flex shrink-0 items-center justify-center rounded-full bg-[#02FF40]/100 px-7 py-2.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,255,90,0.1)] transition-colors duration-150 hover:bg-[#02FF40]/90 lg:absolute lg:bottom-5 lg:left-6 lg:mt-0"
              >
                download now
              </a>
            </div>
          </MagicCard>
        </div>
      </section>
    </main>
  );
}