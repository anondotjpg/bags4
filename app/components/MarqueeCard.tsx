import Image from "next/image";
import React from "react";
import { IoPeopleSharp } from "react-icons/io5";

export type MarqueeToken = {
  id: number;
  name: string;
  symbol: string;
  tokenImage: string;        // e.g. "/t1.webp"
  feeEarnerUsername: string; // can be "user" or "@user"
  feeEarnerAvatar: string;   // e.g. "/c1.webp"
  earningsDisplay: string;   // e.g. "$27,472"
  holdersDisplay: string;    // e.g. "1,204"
};

type MarqueeCardProps = {
  token: MarqueeToken;
  className?: string;
};

const MAX_USERNAME_CHARS = 10;

export function MarqueeCard({ token, className = "" }: MarqueeCardProps) {
  // build X profile URL, strip leading @ if present
  const handle = token.feeEarnerUsername.replace(/^@/, "");
  const profileUrl = `https://x.com/${handle}`;

  // display username with character limit (does not affect link)
  let displayUsername = token.feeEarnerUsername;
  if (displayUsername.length > MAX_USERNAME_CHARS) {
    displayUsername =
      displayUsername.slice(0, MAX_USERNAME_CHARS - 1) + "…";
  }

  return (
    <div
      className={`
        relative
        h-60 w-90 flex-shrink-0
        rounded-2xl
        bg-[#050506]
        border border-white/10
        overflow-hidden
        px-5 py-4
        flex flex-col justify-between
        ${className}
      `}
    >
      {/* neutral vignette – no color tint */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.95),transparent_60%)]
          opacity-55
        "
      />

      {/* TOP: left = token image + symbol/name, right = holder count */}
      <div className="relative flex items-start justify-between gap-4">
        {/* Left: token image + symbol/name */}
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="
              relative
              h-12 w-12
              flex items-center justify-center
            "
          >
            {/* inner wrapper does the rounding + clipping */}
            <div
              className="
                h-full w-full rounded-2xl overflow-hidden
                bg-[#151515]
                border border-white/10
                flex items-center justify-center
              "
            >
              <Image
                src={token.tokenImage}
                alt={`${token.name} logo`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Verified badge bottom-right */}
            <div
              className="
                absolute -bottom-1 -right-1
                h-4 w-4
                rounded-full
                border border-[#050506]
                bg-[#050506]
                overflow-hidden
              "
            >
              <Image
                src="/ver.webp"
                alt="Verified badge"
                width={16}
                height={16}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col text-left min-w-0">
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-neutral-300">
              {token.symbol}
            </span>
            <p className="mt-0.5 text-[18px] font-semibold text-white truncate max-w-[190px]">
              {token.name}
            </p>
          </div>
        </div>

        {/* Right: holders pill */}
        <div
          className="
            inline-flex items-center gap-1.5
            rounded-full border border-white/12
            bg-black/70
            px-2.5 py-1
            text-[11px] text-neutral-200
            shrink-0
          "
        >
          <IoPeopleSharp className="text-[14px]" />
          <span className="tabular-nums">{token.holdersDisplay}</span>
        </div>
      </div>

      {/* BOTTOM: left = X user pill, right = earnings */}
      <div className="relative mt-5 flex items-end justify-between gap-3">
        {/* Earner pill */}
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
            earner
          </span>

          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2.5
              rounded-full border border-white/12
              bg-black/75
              px-3.5 py-1.75
              text-sm text-neutral-200
              no-underline
              hover:border-white/40
              hover:bg-black/90
              transition
            "
          >
            <div className="h-8 w-8 rounded-full overflow-hidden border border-white/15 bg-[#111111]">
              <Image
                src={token.feeEarnerAvatar}
                alt={`${token.feeEarnerUsername} avatar`}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>

            <span className="truncate max-w-[100px]">
              {displayUsername}
            </span>

            <span className="text-[17px] leading-none ml-1">𝕏</span>
          </a>
        </div>

        {/* Earnings bottom-right */}
        <div className="text-right">
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 block">
            earned
          </span>
          <p className="mt-1 text-[20px] font-semibold text-white leading-none">
            {token.earningsDisplay}
          </p>
        </div>
      </div>
    </div>
  );
}