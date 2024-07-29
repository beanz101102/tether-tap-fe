/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useTranslation } from "@/app/[lng]/i18n/client";
import NextImage from "@/components/common/next-image";
import { Button } from "@/components/ui/button";
import {
  KeyCheckUserSpecificActionStatus,
  QuestType,
} from "@/features/tap-game/interfaces/tap-game";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { useAtom } from "jotai";
import { Check, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ScoreAtom } from "../../constants/tap-game";
import { useGetListQuest } from "../../hooks/useGetListQuest";
import useFirestoreWrite from "@/libs/firebase/hooks/useFirestoreWrite";
import { useInitData } from "@tma.js/sdk-react";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

export interface ItemQuestProps {
  type: QuestType;
  questDetail: {
    title: string;
    action_url: string;
  };
  coins: number;
  isClaim: boolean;
  key: KeyCheckUserSpecificActionStatus;
}

const ItemQuest = ({ data }: { data: ItemQuestProps }) => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "earn",
  });
  const { t: tQuest } = useTranslation("quest");
  const initData = useInitData();
  const userTelegramID = initData?.user?.id;
  const { type, questDetail, coins, isClaim: isClaimed, key } = data;
  const [linkOpened, setLinkOpened] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoadingCheckQuest, setIsLoadingCheckQuest] = useState(false);
  const [, setScore] = useAtom(ScoreAtom);
  const { updateStatusTask } = useGetListQuest();
  const { writeData } = useFirestoreWrite();
  const { currentUser } = useGetCurrentUser();

  const isClaimedLocal = useMemo(
    () => isClaimed || isDone,
    [isClaimed, isDone],
  );

  const onDoneTask = () => {
    setIsDone(true);
    setIsLoadingCheckQuest(false);
    writeData("quests", String(userTelegramID), {
      [key]: true,
    });
    updateStatusTask(key);
    setScore((prev) => prev + coins);
  };

  const { trigger } = useSendSocketRequest({
    route: SocketRoutes.ClaimQuest,
    enable: false,
    toastMessage: t("check-quest-success"),
    onDone: () => {
      onDoneTask();
    },
    onError: () => {
      setIsLoadingCheckQuest(false);
      setLinkOpened(false);
    },
  });

  const handleCheckQuest = () => {
    setIsLoadingCheckQuest(true);
    trigger({
      quest_name: key,
      user_id: currentUser?.id,
    });
  };

  return (
    <div
      onClick={() => {
        if (linkOpened || isClaimedLocal) return;
        window.open(questDetail?.action_url);
        setLinkOpened(true);
      }}
      className={
        "main-bg-primary flex cursor-pointer items-center justify-between rounded-lg border border-[#45887A] px-4 py-2"
      }
    >
      <div className={"flex items-center"}>
        <div className="h-8 w-8">
          {type === QuestType.TWITTER ? (
            <NextImage
              className={"h-8 w-8"}
              src={"/img/tap-game/twitter.svg"}
              alt={"twitter"}
            />
          ) : (
            <div
              className={
                "flex h-8 w-8 items-center justify-center rounded-full bg-sky-500"
              }
            >
              <NextImage
                className={"h-5 w-5"}
                src={"/img/tap-game/telegram.svg"}
                alt={"telegram"}
              />
            </div>
          )}
        </div>
        <div className={"ml-3"}>
          <p className={"main-text-primary text-base font-semibold"}>
            {tQuest(questDetail?.title || "")}
          </p>
          <div className={"flex items-center"}>
            <p className={"main-text-primary pr-1 text-sm font-semibold"}>
              + {formatNumberWithCommas(coins)}
            </p>
            <NextImage
              src={"/img/tap-game/coin.webp"}
              className={"h-4 w-4"}
              alt={"coins"}
            />
          </div>
        </div>
      </div>

      {isClaimedLocal ? (
        <Check className={"main-text-success"} />
      ) : linkOpened ? (
        <Button
          loading={isLoadingCheckQuest}
          onClick={() => handleCheckQuest()}
          variant={'common'}
          className={"!w-[75px] !h-[32px] !rounded-[32px]"}
        >
          {t("check")}
        </Button>
      ) : (
        <ChevronRight className={"main-text-secondary h-6 w-6"} />
      )}
    </div>
  );
};

export default ItemQuest;
