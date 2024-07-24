import {useGetUserTapGameInfo} from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import {UserTapGameInfo} from "@/features/tap-game/constants/tap-game";


export const useEnergy = () => {
  const { setUserTabGameInfo, userTapGameInfo } = useGetUserTapGameInfo();
  const handleEnergy = (newEnergy: number) => {
    setUserTabGameInfo({
      ...(userTapGameInfo as UserTapGameInfo),
      energy_balance: newEnergy,
    });
  };
  return {
    handleEnergy,
    currentEnergy: Number(userTapGameInfo?.energy_balance),
    maxEnergy: Number(userTapGameInfo?.max_energy_reached),
  };
};
