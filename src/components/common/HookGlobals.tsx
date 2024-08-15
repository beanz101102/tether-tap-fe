import {useGetListQuest} from "@/features/tap-game/hooks/useGetListQuest";
import {memo} from "react";
import {useGetTokenInfo} from "@/features/tap-game/hooks/useGetTokenInfo";
import {useCalculatorCoinPerSecond} from "@/features/tap-game/hooks/useCalculatorCoinPerSecond";
import {useWatchExpiredPacks} from "@/features/tap-game/hooks/useWatchExpiredPacks";

export const HookGlobals = memo(
  () => {
    useGetListQuest();
    useGetTokenInfo();
    useCalculatorCoinPerSecond();
    useWatchExpiredPacks();
    return null;
  },
  () => true,
);

HookGlobals.displayName = "HookGlobals";
