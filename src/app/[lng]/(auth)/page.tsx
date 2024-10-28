"use client";

import NextImage from "@/components/common/next-image";
import AnimatedNumber from "@/components/ui/animated-number";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import { useGetCurrentBalance } from "@/features/tap-game/hooks/useGetCurrentBalance";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import WhackAMole from "@/features/whale-a-mole";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "../i18n/client";

export default function Home() {
  const { t } = useTranslation("tap-game");
  const { isLoading } = useGetUserTapGameInfo();
  const score = useGetCurrentBalance();

  return (
    <div className="overflow-hidden">
      <TapPageHeader />
      <div className="mx-auto my-4 flex w-fit items-center justify-center gap-2">
        <NextImage
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
          alt="usdt"
          className="h-8 w-8"
        />
        <WrapSkeleton className={"h-[25px] w-[60px]"} isSkeleton={isLoading}>
          <AnimatedNumber
            value={Number(Number(score ?? 0).toFixed(7))}
            hasComma={true}
            size={30}
            duration={200}
          />
        </WrapSkeleton>
      </div>
      <WhackAMole />;
    </div>
  );
}

const TapPageHeader = () => {
  const [isOpenModalAboutGainCoin, setIsOpenModalAboutGainCoin] =
    useState(false);
  const { t } = useTranslation("tap-game");
  const { t: tMine } = useTranslation("mine");
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const router = useRouter();

  return (
    <>
      <div
        className={
          "main-border-divider-secondary flex items-start justify-center border-b"
        }
      >
        <div
          className={"flex w-[50%] flex-col items-start px-3 py-2"}
          // onClick={() => router.push("boost")}
        >
          <p className={"main-text-secondary text-xs font-medium"}>
            {t("earn_per_tap")}
          </p>
          <div className={"flex items-center justify-center"}>
            <Image
              width={20}
              height={20}
              src={
                "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
              }
              alt={"coin"}
              className={"mr-2 h-5 w-5"}
            />
            <p className={"main-text-primary font-bold"}>
              +{userTapGameInfo?.coins_earned_per_tap ?? 0}
            </p>
          </div>
        </div>
        <div className={"flex w-[50%] items-center"}>
          <div className={"main-border-divider-secondary h-[35px] border-l"} />
          <div className={"flex w-full flex-col items-end px-3 py-2"}>
            <p className={"main-text-secondary text-xs font-medium"}>
              {t("profit_per_hour")}
            </p>
            <div className={"flex items-center justify-center"}>
              <p className={"main-text-primary font-bold"}>
                +
                {formatNumberWithCommas(
                  userTapGameInfo?.coins_bonus_per_hour ?? 0,
                  3,
                )}
              </p>
              <Image
                width={20}
                height={20}
                src={
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                }
                alt={"coin"}
                className={"mx-2 h-5 w-5"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
