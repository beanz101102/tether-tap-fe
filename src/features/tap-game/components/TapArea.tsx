"use client";
import { FC, LegacyRef, memo, useEffect, useRef, useState } from "react";
import { useTap } from "@/features/tap-game/hooks/useTap";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/utils/cn";
import NextImage from "@/components/common/next-image";
import { useGetUserTapGameInfo } from "../hooks/useGetUserTapGameInfo";

interface TapAreaProps {
  className?: string;
}

const TapArea: FC<TapAreaProps> = memo(({ className }) => {
  const { taps, setTaps, handleTap, isDisable } = useTap();
  const controls = useAnimation();
  const tapAreaRef = useRef<HTMLDivElement>();
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const animateCoin = async () => {
    await controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.7 },
    });
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

      {taps.map((tap) => {
        return (
          <div
            key={tap.id}
            className={
              "animate__animated animate__fadeOutUp animate__duration-1500ms absolute z-20 flex items-center justify-center"
            }
            style={{
              transform: `translate(${tap.x}px, ${tap.y}px)`,
              userSelect: "none",
            }}
            onAnimationEnd={() => {
              setTaps((currentTaps) =>
                currentTaps.filter((t) => t.id !== tap.id),
              );
            }}
          >
            <p className={"text-3xl font-extrabold text-white"}>
              +
              {isNaN(tap.value)
                ? 0
                : userTapGameInfo?.coins_earned_per_tap?.toString()}
            </p>
          </div>
        );
      })}
    </div>
  );
});

TapArea.displayName = "TapArea";
export default TapArea;
