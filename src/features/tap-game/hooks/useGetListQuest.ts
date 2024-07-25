import { CheckUserSpecificActionStatusData } from "@/features/tap-game/interfaces/tap-game";
import useFirestoreRead from "@/libs/firebase/hooks/useFirestoreRead";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useInitData } from "@tma.js/sdk-react";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const statusQuestAtom = atom<CheckUserSpecificActionStatusData | null>({
  FOLLOW_TWITTER: false,
  JOIN_TELEGRAM_CHANNEL: false,
});

export const useGetListQuest = () => {
  const initData = useInitData();
  const userTelegramID = initData?.user?.id;
  const { data, loading } = useFirestoreRead("quests", String(userTelegramID));
  const [statusListQuest, setStatusListQuest] = useAtom(statusQuestAtom);

  useEffect(() => {
    if (data) {
      setStatusListQuest(data);
    }
  }, [data]);

  const updateStatusTask = (key: string) => {
    if (!statusListQuest) return;
    setStatusListQuest({
      ...statusListQuest,
      [key]: true,
    });
  };

  return {
    checkUserSpecificActionStatusData: statusListQuest,
    updateStatusTask,
    loading,
  };
};
