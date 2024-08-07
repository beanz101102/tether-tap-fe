import { useEffect, useMemo } from "react";
import {
  levelNext,
  openModalLevelUpAtom,
  ScoreAtom,
  TapLevel,
  UserCoinsLevelInfo,
  UserTapGameInfo,
} from "../constants/tap-game";
import { useGetUserTapGameInfo } from "./useGetUserTapGameInfo";
import { useAtom } from "jotai";

export const useGetCurrentLevel = () => {
  const levels = Object.values(TapLevel);
  const [score] = useAtom(ScoreAtom);
  const [, setIsOpenModalLevelUp] = useAtom(openModalLevelUpAtom);
  const { setUserTabGameInfo, userTapGameInfo } = useGetUserTapGameInfo();
  const currentLevelIndex = levels.findIndex((level) => Number(score) < level);

  const defaultLevelIndex = useMemo(
    () => (currentLevelIndex === -1 ? 10 : currentLevelIndex),
    [currentLevelIndex],
  );
  const isLevelCompleted = useMemo(
    () =>
      defaultLevelIndex <
      Number(userTapGameInfo?.user_coins_level_info?.current_level),
    [defaultLevelIndex, userTapGameInfo?.user_coins_level_info?.current_level],
  );
  const currentLevel = useMemo(
    () =>
      isLevelCompleted
        ? Number(userTapGameInfo?.user_coins_level_info?.current_level)
        : defaultLevelIndex,
    [
      defaultLevelIndex,
      isLevelCompleted,
      userTapGameInfo?.user_coins_level_info?.current_level,
    ],
  );

  const coinNextLevel =
    levelNext[Number(userTapGameInfo?.user_coins_level_info?.current_level)];
  const progress = useMemo(
    () =>
      !score || !coinNextLevel
        ? 0
        : (Number(score) / Number(coinNextLevel)) * 100,
    [coinNextLevel, score],
  );

  useEffect(() => {
    if (
      !userTapGameInfo?.user_coins_level_info?.current_level ||
      Number(userTapGameInfo?.user_coins_level_info?.current_level) ===
        currentLevel ||
      !userTapGameInfo
    )
      return;
    setUserTabGameInfo((prev) => {
      return {
        ...(prev as UserTapGameInfo),
        coins_earned_per_tap:
          Number(userTapGameInfo?.coins_earned_per_tap) + 1000,
        user_coins_level_info: {
          ...(prev?.user_coins_level_info as UserCoinsLevelInfo),
          current_level: currentLevel,
        },
      };
    });

    setIsOpenModalLevelUp(true);
  }, [
    currentLevel,
    userTapGameInfo?.user_coins_level_info?.current_level,
    userTapGameInfo?.coins_earned_per_tap,
  ]);

  return {
    currentLevel,
    progress,
  };
};
