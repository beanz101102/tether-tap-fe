import {useEffect} from "react";
import {atom, useAtom} from "jotai";
import {useGetUserTapGameInfo} from "@/features/tap-game/hooks/useGetUserTapGameInfo";

export const calculatorCoinPerSecondAtom = atom<number>(0);

export const useCalculatorCoinPerSecond = () => {
  const [currentTotal, setCurrentTotal] = useAtom(calculatorCoinPerSecondAtom);
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const coinsPerHour = userTapGameInfo?.coins_bonus_per_hour || 0; // Maximum coins got in a hour
  const coinsPerSecond = coinsPerHour / 3600; // Calculate coins per second

  useEffect(() => {
    const interval = setInterval(() => {
      if (coinsPerSecond > 0) {
        setCurrentTotal((prevTotal) => {
          return prevTotal + coinsPerSecond; // Ensure we don't exceed coinsPerHour
        });
      }
    }, 995);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [coinsPerSecond]);

  console.log('currentTotal', currentTotal);
};
