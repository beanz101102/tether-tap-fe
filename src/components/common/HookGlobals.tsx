import { useGetListQuest } from "@/features/tap-game/hooks/useGetListQuest";
import { memo } from "react";
import {useGetTokenInfo} from "@/features/tap-game/hooks/useGetTokenInfo";

export const HookGlobals = memo(
  () => {
    useGetListQuest();
    useGetTokenInfo()
    return null;
  },
  () => true,
);

HookGlobals.displayName = "HookGlobals";
