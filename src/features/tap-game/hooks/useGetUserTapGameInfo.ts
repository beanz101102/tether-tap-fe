import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { ScoreAtom, UserTapGameInfo } from "../constants/tap-game";
import { useAppSelector } from "@/libs/redux/hooks";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

export const userTapGameInfoAtom = atom<UserTapGameInfo | null>(
    //TODO: mock data
    {
  coins_balance: 5000,
  coins_earned_per_tap: 50,
  energy_balance: 100,
  max_energy_reached: 200,
  user_coins_level_info: {
    coins_to_level_up: 1000,
    current_level: 5,
    max_level: 10,
    current_level_name: "Expert",
  },
  coins_per_tap_level: 3,
  max_energy_level: 4,
  is_already_reset_max_energy: false,
});

export const useGetUserTapGameInfo = () => {
  const [userTapGameInfo, setUserTabGameInfo] = useAtom(userTapGameInfoAtom);

  return {
    userTapGameInfo,
    setUserTabGameInfo,
    isLoading: !userTapGameInfo,
  };
};
