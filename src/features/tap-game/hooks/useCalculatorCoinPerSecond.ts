import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";

export const calculatorCoinPerSecondAtom = atom<number>(0);

export const useCalculatorCoinPerSecond = () => {
  const [currentTotal, setCurrentTotal] = useAtom(calculatorCoinPerSecondAtom);
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const coinsPerHour = userTapGameInfo?.coins_bonus_per_hour || 0; // Maximum coins got in a hour
  const coinsPerSecond = coinsPerHour / 3600; // Calculate coins per second

  useEffect(() => {
    if (coinsPerHour === 0) return;
    const interval = setInterval(() => {
      setCurrentTotal((prevTotal) => {
        const newTotal = prevTotal + coinsPerSecond;
        return newTotal; // Ensure we don't exceed coinsPerHour
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentTotal, coinsPerHour, coinsPerSecond]);
};
