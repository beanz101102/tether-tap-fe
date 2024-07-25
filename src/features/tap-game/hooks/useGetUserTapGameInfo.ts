import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { ScoreAtom, UserTapGameInfo } from "../constants/tap-game";
import { useAppSelector } from "@/libs/redux/hooks";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

export const userTapGameInfoAtom = atom<UserTapGameInfo | null>(null);

export const useGetUserTapGameInfo = () => {
  const [userTapGameInfo, setUserTabGameInfo] = useAtom(userTapGameInfoAtom);

  return {
    userTapGameInfo,
    setUserTabGameInfo,
    isLoading: !userTapGameInfo,
  };
};
