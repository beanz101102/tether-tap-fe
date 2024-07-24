import { useGetCurrentLevel } from "@/features/tap-game/hooks/useGetCurrentLevel";
import {
  baseReferReward,
  bonusReferByLevel,
} from "@/features/tap-game/constants/tap-game";

export const useGetAmountRewardReferral = () => {
  const { currentLevel } = useGetCurrentLevel();

  return {
    normal:
      baseReferReward.NORMAL + Number(bonusReferByLevel[currentLevel || 1]),
    premium:
      baseReferReward.PREMIUM + Number(bonusReferByLevel[currentLevel || 1]),
  };
};
