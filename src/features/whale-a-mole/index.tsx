"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import NextImage from "@/components/common/next-image";
import { useUpdateUserCoinsWhenTap } from "@/features/tap-game/hooks/useUpdateUserCoinsWhenTap";
import { useAtom } from "jotai";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import BigNumber from "bignumber.js";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import useSpritesheetAnimation from "./useSpritesheetAnimation";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import AnimatedNumber from "@/components/ui/animated-number";
import { initHapticFeedback } from "@tma.js/sdk-react";
import "./index.css";

const MOLE_COUNT = 9;
const MOLE_POP_UP_INTERVAL = 2000; // milliseconds
const MOLE_STAY_UP_DURATION = 1500; // milliseconds
const MOLE_GO_DOWN_DURATION = 500; // milliseconds

export default function WhackAMole() {
  const [moles, setMoles] = useState(Array(MOLE_COUNT).fill(false));
  const hapticFeedback = initHapticFeedback();

  const { handleUpdateUserCoinsWhenTap, isLoading } =
    useUpdateUserCoinsWhenTap();
  const [score, setScore] = useAtom(ScoreAtom);
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const coinGainPerTap = Number(userTapGameInfo?.coins_earned_per_tap);

  const [gameActive, setGameActive] = useState(false);
  const [moleStates, setMoleStates] = useState(
    Array(MOLE_COUNT).fill("hidden"),
  );
  const moleTimers = useRef<(NodeJS.Timeout | null)[]>(
    Array(MOLE_COUNT).fill(null),
  );

  const startGame = () => {
    setMoles(Array(MOLE_COUNT).fill(false));
    setGameActive(true);
  };

  const endGame = useCallback(() => {
    setGameActive(false);
    setMoles(Array(MOLE_COUNT).fill(false));
    setMoleStates(Array(MOLE_COUNT).fill("hidden"));
    // Clear all timers
    moleTimers.current.forEach((timer) => {
      if (timer) clearTimeout(timer);
    });
    moleTimers.current = Array(MOLE_COUNT).fill(null);
  }, []);

  const whackMole = (index: number) => {
    if (moleStates[index] === "up" && gameActive) {
      hapticFeedback.impactOccurred("heavy");

      setScore((prevScore) =>
        new BigNumber(prevScore).plus(new BigNumber(coinGainPerTap)).toFixed(7),
      );
      handleUpdateUserCoinsWhenTap({
        increasedTaps: 1,
      });

      setMoleStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = "hit";
        return newStates;
      });
      // Clear existing timer for this mole
      if (moleTimers.current[index]) {
        clearTimeout(moleTimers.current[index]!);
      }
      // Set timer to hide the mole after hit animation
      moleTimers.current[index] = setTimeout(() => {
        setMoleStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = "hidden";
          return newStates;
        });
      }, 500); // Duration of hit animation
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive) {
      interval = setInterval(() => {
        const availableMoles = moleStates
          .map((state, index) => (state === "hidden" ? index : -1))
          .filter((index) => index !== -1);
        if (availableMoles.length > 0) {
          const randomIndex =
            availableMoles[Math.floor(Math.random() * availableMoles.length)];

          // Clear any existing timer for this mole
          if (moleTimers.current[randomIndex ?? 0]) {
            clearTimeout(moleTimers.current[randomIndex ?? 0]!);
          }

          // Set the mole state to "up"
          setMoleStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[randomIndex ?? 0] = "up";
            return newStates;
          });

          // Set a single timer for the entire cycle
          moleTimers.current[randomIndex ?? 0] = setTimeout(() => {
            setMoleStates((prevStates) => {
              const newStates = [...prevStates];
              newStates[randomIndex ?? 0] = "down";
              return newStates;
            });

            // After going down, set to hidden
            setTimeout(() => {
              setMoleStates((prevStates) => {
                const newStates = [...prevStates];
                newStates[randomIndex ?? 0] = "hidden";
                return newStates;
              });
            }, MOLE_GO_DOWN_DURATION);
          }, MOLE_STAY_UP_DURATION);
        }
      }, MOLE_POP_UP_INTERVAL);
    }
    return () => {
      clearInterval(interval);
      moleTimers.current.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [gameActive]);

  //   // animation xuất hiện
  const { style: styleUp, containerRef: containerRefUp } =
    useSpritesheetAnimation({
      imageUrl: "/img/step1.png",
      frameWidth: 225.3,
      frameHeight: 169,
      frameCount: 3,
      fps: 2, // 3 frames / 1.5 seconds ≈ 2 fps
      maxSize: 200,
    });

  const { style: styleDown, containerRef: containerRefDown } =
    useSpritesheetAnimation({
      imageUrl: "/img/step2.png",
      frameWidth: 225.3,
      frameHeight: 169,
      frameCount: 3,
      fps: 6, // 3 frames / 0.5 seconds = 6 fps
      maxSize: 200,
    });

  const { style: styleHit, containerRef: containerRefHit } =
    useSpritesheetAnimation({
      imageUrl: "/img/step3.png",
      frameWidth: 225.3,
      frameHeight: 169,
      frameCount: 4,
      fps: 8, // 4 frames / 0.5 seconds = 8 fps
      maxSize: 200,
    });

  const step1 = "/img/hole.png";

  return (
    <div
      className="mx-auto flex h-[100vh] w-full max-w-2xl flex-col items-center justify-center bg-white"
      style={{
        backgroundImage: "url('/img/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-4 text-center">
        <WrapSkeleton className={"h-[25px] w-[60px]"} isSkeleton={isLoading}>
          <AnimatedNumber
            value={Number(Number(score ?? 0).toFixed(7))}
            hasComma={true}
            size={30}
            duration={200}
          />
        </WrapSkeleton>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        {moleStates.map((state, index) => (
          <div
            key={index}
            className={`cursor-custom relative h-[100px] w-[100px] transition-all duration-100`}
            onClick={() => whackMole(index)}
          >
            <NextImage
              src={step1}
              alt="hole"
              className="w-[100px]"
              width={226}
              height={168}
            />
            {state !== "hidden" && (
              <div
                ref={
                  state === "up"
                    ? containerRefUp
                    : state === "down"
                      ? containerRefDown
                      : containerRefHit
                }
                className="absolute left-[-6px] top-[-12px] mx-auto w-[100px]"
              >
                <div
                  style={
                    state === "up"
                      ? styleUp
                      : state === "down"
                        ? styleDown
                        : styleHit
                  }
                  className="mx-auto w-[100px]"
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button onClick={gameActive ? endGame : startGame}>
          {gameActive ? "End Game" : "Start  Game"}
        </Button>
      </div>
    </div>
  );
}
