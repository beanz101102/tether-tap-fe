"use client";
import { FC, LegacyRef, memo, useEffect, useRef, useState } from "react";
import { useTap } from "@/features/tap-game/hooks/useTap";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { cn } from "@/utils/cn";
import NextImage from "@/components/common/next-image";

interface TapAreaProps {
  className?: string;
}

const TapArea: FC<TapAreaProps> = memo(({ className }) => {
  const [isActive, setIsActive] = useState(false);
  const { taps, setTaps, handleTap, isDisable } = useTap();
  const controls = useAnimation();
  const tapAreaRef = useRef<HTMLDivElement>();
  const [tapTimer, setTapTimer] = useState<NodeJS.Timeout | null>(null);

  const animateCoin = async () => {
    await controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.7 },
    });
  };

  const toggleActive = () => {
    setIsActive(true);
    if (tapTimer) clearTimeout(tapTimer);
    setTapTimer(
      setTimeout(() => {
        setIsActive(false);
      }, 500),
    );
  };

  useEffect(() => {
    const handlePrevent = (ev: TouchEvent) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    };

    const element = tapAreaRef.current;

    if (element) {
      // Add event listener with explicit function binding and type assertion if needed
      const listener = (ev: TouchEvent) => handlePrevent(ev);
      element.addEventListener("touchmove", listener, { passive: false });

      return () => {
        element.removeEventListener("touchmove", listener);
      };
    }
  }, [tapAreaRef.current]);

  return (
    <div
      ref={tapAreaRef as LegacyRef<HTMLDivElement>}
      onTouchStart={(e) => {
        // if (isLoading) return;
        handleTap(e);
        animateCoin();
        toggleActive();
      }}
      onWheel={(event) => {
        event.preventDefault();
      }}
      onTouchMove={(event) => {
        event.preventDefault();
      }}
      className={cn(
        "scrollbar-hide relative flex h-[70vh] min-h-[300px] w-full items-start justify-center overflow-x-hidden ",
        className && className,
      )}
    >
      <div
        className={cn(
          "absolute top-[40%] -translate-y-1/2",
          isDisable && "grayscale",
        )}
      >
        <motion.div animate={controls}>
          <div className="relative h-[250px] w-[250px]">
            <NextImage
              width={250}
              height={250}
              src="/img/tap-game/tether-coin.webp"
              alt="coin"
              className="absolute left-0 top-[15%] h-[250px] w-[250px] object-cover"
            />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {taps.map((tap) => {
          return (
            <motion.div
              key={tap.id}
              initial={{ opacity: 1, scale: 1, x: tap.x, y: tap.y }}
              animate={{
                opacity: 0,
                scale: 0.5,
              }}
              exit={{ opacity: 0, scale: 0, display: "none" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                userSelect: "none",
              }}
              className={"absolute z-20 flex items-center justify-center"}
              onAnimationComplete={() => {
                setTaps((currentTaps) =>
                  currentTaps.filter((t) => t.id !== tap.id),
                );
              }}
            >
              <p
                className={
                  "tap-game-coin-gained-stroke text-5xl font-extrabold text-[#6EE7B7]"
                }
              >
                +{isNaN(tap.value) ? 0 : tap.value}
              </p>
              {/*<Lottie*/}
              {/*  options={{*/}
              {/*    loop: false,*/}
              {/*    autoplay: true,*/}
              {/*    animationData: coinFlip,*/}
              {/*  }}*/}
              {/*  height={80}*/}
              {/*  width={80}*/}
              {/*/>*/}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});

TapArea.displayName = "TapArea";
export default TapArea;
