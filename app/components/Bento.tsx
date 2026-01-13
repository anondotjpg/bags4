// BentoGrid.tsx (or wherever your bento demo lives)
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4",
        "rounded-[24px] border border-white/5 bg-[#0c0c0f]",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.85)_inset,0_18px_45px_rgba(0,0,0,0.8)]",
        "transition-all duration-200 hover:-translate-y-0.5",
        "p-4 md:p-5",
        className,
      )}
    >
      {/* 🔹 Header – NO gradient / mask, just a flat dark block */}
      {header && (
        <div className="flex h-full min-h-[6rem] w-full rounded-[18px] border border-white/5 bg-[#050507] overflow-hidden">
          {header}
        </div>
      )}

      <div className="transition-transform duration-200 group-hover/bento:translate-x-1">
        {icon && (
          <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#141414] text-[13px] text-neutral-300">
            {icon}
          </div>
        )}
        <div className="mt-1 mb-1 font-sans text-sm font-semibold text-white md:text-base">
          {title}
        </div>
        <div className="font-sans text-xs font-normal leading-relaxed text-neutral-400 md:text-[13px]">
          {description}
        </div>
      </div>
    </div>
  );
};