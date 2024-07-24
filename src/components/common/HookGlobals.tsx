import { useGetListQuest } from "@/features/tap-game/hooks/useGetListQuest";
import { memo } from "react";

export const HookGlobals = memo(
  () => {
      // TODO: reopen
    // useGetListQuest();
    return null;
  },
  () => true,
);

HookGlobals.displayName = "HookGlobals";
