import {useAtom} from 'jotai';
import {ScoreAtom} from "@/features/tap-game/constants/tap-game";
import {calculatorCoinPerSecondAtom} from "@/features/tap-game/hooks/useCalculatorCoinPerSecond";


export const useGetCurrentBalance = () => {
  const [score] = useAtom(ScoreAtom);
  const [totalCoinPerHour] = useAtom(calculatorCoinPerSecondAtom);

  return String(Number(score) + Number(totalCoinPerHour));
};
