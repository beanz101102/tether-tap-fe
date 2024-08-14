import { useAtom } from 'jotai';
import {ScoreAtom} from "@/features/tap-game/constants/tap-game";
import {calculatorCoinPerSecondAtom} from "@/features/tap-game/hooks/useCalculatorCoinPerSecond";
import {useMemo} from "react";
import {useGetUserTapGameInfo} from "@/features/tap-game/hooks/useGetUserTapGameInfo";


export const useGetCurrentBalance = () => {
  const [score] = useAtom(ScoreAtom);
  const [totalCoinPerHour] = useAtom(calculatorCoinPerSecondAtom);
  const { userTapGameInfo } = useGetUserTapGameInfo();

  const increaseCoinTimes = userTapGameInfo?.coins_earned_per_tap ? Number(totalCoinPerHour) / Number(userTapGameInfo?.coins_earned_per_tap) : 0;
  const realTimeBalance = useMemo(() => {
    return Number(score) + Number(((userTapGameInfo?.coins_earned_per_tap||0) * Math.floor(increaseCoinTimes)))
  }, [increaseCoinTimes, score, userTapGameInfo?.coins_earned_per_tap]);
  console.log('realTimeBalance', realTimeBalance, Number(score), Number(((userTapGameInfo?.coins_earned_per_tap||0) * Math.floor(increaseCoinTimes))), (userTapGameInfo?.coins_earned_per_tap||0), Math.floor(increaseCoinTimes))
  return String(Number(score) + Number(totalCoinPerHour));
};
