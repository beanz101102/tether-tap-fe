import { useListenUserTapGameInfoUpdated } from "@/features/tap-game/hooks/useListenUserTapGameInfoUpdated";
import { memo } from "react";

export const ListenWsUpdateGlobal = memo(
  () => {
    useListenUserTapGameInfoUpdated();
    return null;
  },
  () => true,
);

ListenWsUpdateGlobal.displayName = "ListenWsUpdateGlobal";
