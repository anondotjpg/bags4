"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";

const SPRING_CONFIG = {
  type: "spring",
  stiffness: 200,
  bounce: 0,
  damping: 22,
} as const;

type AppItem = {
  key: string;
  name: string;
  iconSrc: string;
  // layoutId means it participates in shared layout animation (the “folder mini-grid” items)
  layoutId?: string;
};

type BagsAppFolderProps = {
  title?: string;
  apps: AppItem[];
  className?: string;
};

export function BagsAppFolder({
  title = "Apps",
  apps,
  className,
}: BagsAppFolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // The small mini-grid inside the folder preview — we compute origin from this.
  const miniGridRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  // Refs to each open-grid item so we can compute offsets from origin.
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [itemOffsets, setItemOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const setItemRef = (el: HTMLDivElement | null, key: string) => {
    itemRefs.current[key] = el;
  };

  const openFolder = useCallback(() => {
    const rect = miniGridRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsOpen(true);
  }, []);

  const closeFolder = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Split “layout” items (shown in mini-grid with shared layout) vs non-layout (fly-out only).
  const { layoutApps, flyApps } = useMemo(() => {
    // Pick 4 to be the “mini-grid” items that have layoutIds.
    const layoutApps = apps.slice(0, 4).map((a) => ({
      ...a,
      layoutId: a.layoutId ?? `app-${a.key}`,
    }));
    const flyApps = apps.slice(4).map((a) => ({ ...a, layoutId: undefined }));
    return { layoutApps, flyApps };
  }, [apps]);

  const allOpenApps = useMemo(() => [...layoutApps, ...flyApps], [layoutApps, flyApps]);

  useLayoutEffect(() => {
    if (!isOpen || !origin) return;

    const next: Record<string, { x: number; y: number }> = {};

    for (const app of allOpenApps) {
      const el = itemRefs.current[app.key];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      next[app.key] = { x: origin.x - cx, y: origin.y - cy };
    }

    setItemOffsets(next);
  }, [isOpen, origin, allOpenApps]);

  const offsetsReady =
    Boolean(isOpen && origin) &&
    Object.keys(itemOffsets).length === allOpenApps.length;

  // For stagger timing like your snippet: only non-layout items get staggered.
  const nonLayoutTotal = flyApps.length;

  return (
    <MotionConfig transition={SPRING_CONFIG}>
      <AnimatePresence
        initial={false}
        mode="popLayout"
        onExitComplete={() => {
          if (!isOpen) {
            setItemOffsets({});
            setOrigin(null);
          }
        }}
      >
        {isOpen ? (
          <motion.div
            key="open"
            className="fixed inset-0 z-32 flex items-center justify-center"
            onClick={closeFolder}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.025 } }}
            style={{ willChange: "transform" }}
          >
            {/* dim backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[6px]" />

            <motion.div
              className="relative mx-auto w-[min(980px,92vw)] rounded-[1.65rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.75)]"
              style={{ willChange: "transform" }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
            >
              <motion.div
                className="text-center text-[1.15rem] font-semibold text-zinc-50"
                initial={{ opacity: 0, y: 22, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 22,
                  scale: 0.9,
                  transition: { type: "spring", stiffness: 300, damping: 22 },
                }}
                transition={{ type: "spring", stiffness: 200, damping: 19 }}
                style={{ willChange: "transform" }}
              >
                {title}
              </motion.div>

              <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-6 justify-items-center md:grid-cols-6">
                {allOpenApps.map((app, idx) => (
                  <OpenGridApp
                    key={
                      app.layoutId
                        ? app.key
                        : `${app.key}-${offsetsReady ? "ready" : "wait"}`
                    }
                    app={app}
                    idx={idx}
                    layoutAppsCount={layoutApps.length}
                    nonLayoutTotal={nonLayoutTotal}
                    offsetsReady={offsetsReady}
                    offsets={itemOffsets}
                    setItemRef={setItemRef}
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  className="rounded-full bg-white/10 px-5 py-2 text-sm text-white/90 hover:bg-white/15"
                  onClick={closeFolder}
                >
                  close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            className={className}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{ willChange: "transform" }}
          >
            <div
              className="cursor-pointer relative rounded-[26px] p-3 bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_20px_70px_rgba(0,0,0,0.55)]"
              onClick={openFolder}
            >
              <div className="grid grid-cols-[repeat(2,56px)] grid-rows-[repeat(2,56px)] gap-2.5">
                {/* big tiles */}
                {apps.slice(0, 3).map((app) => (
                  <AppTile
                    key={app.key}
                    iconSrc={app.iconSrc}
                    label={app.name}
                    layoutId={undefined}
                    className="rounded-xl"
                  />
                ))}

                {/* mini-grid (layoutId-enabled items) */}
                <div
                  ref={miniGridRef}
                  className="grid grid-cols-[repeat(2,26px)] grid-rows-[repeat(2,26px)] gap-1.5"
                >
                  {layoutApps.slice(0, 4).map((app) => (
                    <div key={app.key} className="relative aspect-square">
                      <AppTile
                        iconSrc={app.iconSrc}
                        label={app.name}
                        layoutId={app.layoutId}
                        className="rounded-[6px]"
                      />
                      <motion.div
                        className="absolute left-1/2 top-full mt-2 text-[0.80rem] text-white/40 pointer-events-none whitespace-nowrap"
                        aria-hidden
                        layoutId={`label-${app.layoutId}`}
                        style={{ opacity: 0 }}
                      >
                        {app.name}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 text-center text-xs tracking-wider text-white/50">
              {title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

interface AppTileProps {
  iconSrc: string;
  label: string;
  layoutId?: string;
  className?: HTMLAttributes<"img">["className"];
}

function AppTile({ iconSrc, label, layoutId, className }: AppTileProps) {
  return (
    <motion.img
      className={`size-full max-w-full max-h-full ${className}`}
      src={iconSrc}
      alt={label}
      aria-label={label}
      layoutId={layoutId}
      draggable={false}
    />
  );
}

function OpenGridApp({
  app,
  idx,
  layoutAppsCount,
  nonLayoutTotal,
  offsetsReady,
  offsets,
  setItemRef,
}: {
  app: AppItem;
  idx: number;
  layoutAppsCount: number;
  nonLayoutTotal: number;
  offsetsReady: boolean;
  offsets: Record<string, { x: number; y: number }>;
  setItemRef: (el: HTMLDivElement | null, key: string) => void;
}) {
  const off = offsets[app.key] ?? { x: 0, y: 0 };
  const hasLayout = Boolean(app.layoutId);

  // “non-layout” index among fly apps only
  const nonLayoutIdx = Math.max(0, idx - layoutAppsCount);

  const openDelay = offsetsReady ? (hasLayout ? 0 : -0.025 + nonLayoutIdx * 0.025) : 0;
  const closeDelay = offsetsReady
    ? hasLayout
      ? 0
      : -0.095 + (nonLayoutTotal - 1 - nonLayoutIdx) * 0.025
    : 0;

  return (
    <motion.div
      ref={(el) => setItemRef(el, app.key)}
      className="flex flex-col items-center gap-2"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: openDelay,
      }}
      initial={
        hasLayout
          ? { opacity: 1 }
          : offsetsReady
            ? { opacity: 0, scale: 0.2, x: off.x, y: off.y }
            : { opacity: 0 }
      }
      animate={
        hasLayout
          ? { opacity: 1 }
          : offsetsReady
            ? { opacity: 1, scale: 1, x: 0, y: 0 }
            : { opacity: 0 }
      }
      exit={
        hasLayout
          ? { opacity: 1 }
          : {
              opacity: 0,
              scale: 0.2,
              x: off.x,
              y: off.y,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 22,
                delay: closeDelay,
                opacity: { delay: 0.05 },
              },
            }
      }
      style={{ willChange: "transform" }}
    >
      <div className="size-20 md:size-24">
        <AppTile
          layoutId={app.layoutId}
          iconSrc={app.iconSrc}
          label={app.name}
          className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
        />
      </div>

      {hasLayout ? (
        <motion.div
          layoutId={`label-${app.layoutId}`}
          className="text-[0.85rem] text-white/90 whitespace-nowrap"
        >
          {app.name}
        </motion.div>
      ) : (
        <div className="text-[0.85rem] text-white/90 whitespace-nowrap">
          {app.name}
        </div>
      )}
    </motion.div>
  );
}