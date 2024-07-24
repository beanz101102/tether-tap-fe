"use client";
import { Loading } from "@/components/common/Loading";
import NextImage from "@/components/common/next-image";
import { useGetListQuest } from "../../hooks/useGetListQuest";
import {
  CheckUserSpecificActionStatusData,
  KeyCheckUserSpecificActionStatus,
  QuestType,
  SpecificActionStatus,
} from "../../interfaces/tap-game";
import ItemQuest, { ItemQuestProps } from "./ItemQuest";
import { useTranslation } from "@/app/[lng]/i18n/client";

const Earn = () => {
  const { t } = useTranslation("tap-game", { keyPrefix: "earn" });
  return (
    <div className={"px-4 pt-6"}>
      <div
        className={
          "relative mx-auto flex  h-[200px] w-[200px] flex-col items-center justify-center"
        }
      >
        <NextImage
          className={"w-[200px]"}
          src={"/img/tap-game/money_bag_earn.svg"}
          alt={"money bag"}
        />
      </div>
      <p className={"main-text-primary text-center text-xl font-semibold"}>
        {t("earn_more_coin")}
      </p>
      <p className={"main-text-secondary mt-2 text-center text-sm font-normal"}>
        {t("des_earn_more_coin")}
      </p>
      <ListQuest />
    </div>
  );
};

const ListQuest = () => {
  const { t } = useTranslation("tap-game", { keyPrefix: "earn" });
  const { checkUserSpecificActionStatusData, loading } = useGetListQuest();
  const listQuestData: ItemQuestProps[] = [
    // {
    //   questDetail: {
    //     title: "follow_twitter",
    //     action_url: "https://t.me/MineLordChannel",
    //   },
    //   type: QuestType.TWITTER,
    //   isClaim:
    //     (checkUserSpecificActionStatusData &&
    //       checkUserSpecificActionStatusData[
    //         KeyCheckUserSpecificActionStatus.FOLLOW_TWITTER
    //       ]) ??
    //     false,
    //   coins: 5000 * 1000,
    //   key: KeyCheckUserSpecificActionStatus?.FOLLOW_TWITTER,
    // },
    {
      questDetail: {
        title: "join_telegram_channel",
        action_url: "https://t.me/pepe",
      },
      type: QuestType.TELEGRAM,
      isClaim:
        (checkUserSpecificActionStatusData &&
          checkUserSpecificActionStatusData[
            KeyCheckUserSpecificActionStatus.JOIN_TELEGRAM_CHANEL
          ]) ??
        false,
      coins: 5000 * 1000,
      key: KeyCheckUserSpecificActionStatus?.JOIN_TELEGRAM_CHANEL,
    },
  ];

  return (
    <div>
      <p className={"main-text-primary main-text-primary mb-2 mt-8 text-base"}>
        {t("quest")}
      </p>
      {listQuestData?.map((e, idx) => {
        return (
          <div key={`item-quest-${idx}`} className={"mb-3"}>
            <ItemQuest data={e as any as ItemQuestProps} />
          </div>
        );
      })}
    </div>
  );
};

export default Earn;