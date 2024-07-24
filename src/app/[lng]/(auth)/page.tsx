"use client";

import AnimatedNumber from "@/components/ui/animated-number";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import ActionBoost from "@/features/tap-game/components/Boost/ActionBoost";
import Energy from "@/features/tap-game/components/Energy";
import LevelUpModal from "@/features/tap-game/components/LevelUpModal";
import ProgressLevel from "@/features/tap-game/components/ProgressLevel";
import TapArea from "@/features/tap-game/components/TapArea";
import { levelNext, ScoreAtom } from "@/features/tap-game/constants/tap-game";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { formatLargeNumber } from "@/utils/formatNumber";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [score] = useAtom(ScoreAtom);
  const { isLoading } = useGetUserTapGameInfo();
  const { currentUser } = useGetCurrentUser();

  return (
    <div
      style={{
        backgroundColor: "black",
        boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.25)",
        backgroundImage: "url(/img/tap-game/tap-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative h-[100vh]"
    >
      <TapPageHeader />
      <div className={""}>
        <div className={"mb-2 h-full w-full px-4 pt-3"}>
          <div className={"flex items-center justify-center"}>
            <Image
              width={32}
              height={32}
              src={"/img/tap-game/coin.svg"}
              alt={"coin"}
              className={"mr-2"}
            />
            <WrapSkeleton
              className={"h-[25px] w-[60px]"}
              isSkeleton={isLoading}
            >
              <AnimatedNumber
                value={score}
                hasComma={true}
                size={30}
                duration={200}
              />
            </WrapSkeleton>
          </div>
        </div>

        <div className={"px-4"}>
          <ProgressLevel />
        </div>
        <div className="">
          <TapArea mainCoinClassName={""} />
        </div>
        <LevelUpModal />
        <div className={"absolute bottom-[90px] left-0 w-full px-4"}>
          <div className={"mb-2 flex w-full items-center justify-between"}>
            <Energy />
            <ActionBoost />
          </div>
        </div>
      </div>
    </div>
  );
}

const TapPageHeader = () => {
  const { t } = useTranslation("tap-game");
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const router = useRouter();

  const coinNextLevel =
    levelNext[Number(userTapGameInfo?.user_coins_level_info?.current_level)];
  return (
    <div
      className={
        "main-border-divider-secondary flex items-start justify-center border-b"
      }
    >
      <div
        className={"flex w-[50%] flex-col items-start px-3 py-2"}
        onClick={() => router.push("boost")}
      >
        <p className={"main-text-secondary text-xs font-medium"}>
          {t("earn_per_tap")}
        </p>
        <div className={"flex items-center justify-center"}>
          <Image
            width={20}
            height={20}
            src={"/img/tap-game/coin.svg"}
            alt={"coin"}
            className={"mr-2 h-5 w-5"}
          />
          <p className={"main-text-primary font-bold"}>
            +{userTapGameInfo?.coins_earned_per_tap ?? 0}
          </p>
        </div>
      </div>
      <div
        className={"flex w-[50%] items-center"}
        onClick={() => router.push("ranking")}
      >
        <div className={"main-border-divider-secondary h-[35px] border-l"} />
        <div className={"flex flex-col items-start px-3 py-2"}>
          <p className={"main-text-secondary text-xs font-medium"}>
            {t("coin_to_level_up")}
          </p>
          <p className={"main-text-primary font-bold"}>
            {formatLargeNumber(Number(coinNextLevel))}
          </p>
        </div>
      </div>
      {/*<div*/}
      {/*  className={"flex w-[33%] flex-col items-start px-3 py-2"}*/}
      {/*  onClick={() => router.push("mine")}*/}
      {/*>*/}
      {/*  <p className={"main-text-secondary text-xs font-medium"}>*/}
      {/*    {t("profit_per_hour")}*/}
      {/*  </p>*/}
      {/*  <div className={"flex items-center justify-center"}>*/}
      {/*    <Image*/}
      {/*      width={20}*/}
      {/*      height={20}*/}
      {/*      src={"/img/tap-game/coin.svg"}*/}
      {/*      alt={"coin"}*/}
      {/*      className={"mr-2 h-5 w-5"}*/}
      {/*    />*/}
      {/*    <p className={"main-text-primary font-bold"}>0</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
