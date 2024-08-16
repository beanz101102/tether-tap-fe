"use client";

import ShadModal from "@/components/ui/ShadModal";
import AnimatedNumber from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import EnergyProgress from "@/features/tap-game/components/EnergyProgress";
import TapArea from "@/features/tap-game/components/TapArea";
import { useGetCurrentBalance } from "@/features/tap-game/hooks/useGetCurrentBalance";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "../i18n/client";
import { AnimatedCounter } from "react-animated-counter";
import { Trans } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("tap-game");
  const { isLoading } = useGetUserTapGameInfo();
  const score = useGetCurrentBalance();

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
        <p
          className={
            "main-text-secondary mt-6 w-full text-center text-sm font-medium"
          }
        >
          {t("your_balance_coin")}
        </p>
        <div className={"mb-2 h-full w-full px-4 pt-3"}>
          <div className={"flex items-center justify-center"}>
            <Image
              width={32}
              height={32}
              src={"/img/tap-game/coin.webp"}
              alt={"coin"}
              className={"mr-2"}
            />
            <WrapSkeleton
              className={"h-[25px] w-[60px]"}
              isSkeleton={isLoading}
            >
              <AnimatedCounter
                value={Number(score ?? 0)}
                color="white"
                decrementColor="white"
                incrementColor="white"
                decimalPrecision={7}
                includeCommas
                fontSize="30px"
                containerStyles={{
                  fontWeight: "600",
                }}
              />
            </WrapSkeleton>
          </div>
        </div>

        <div className="">
          <TapArea />
        </div>
        <div className={"absolute bottom-[90px] left-0 mb-2 w-full px-4"}>
          <EnergyProgress />
        </div>
      </div>
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
              src={"/img/tap-game/coin.webp"}
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
          onClick={() => setIsOpenModalAboutGainCoin(true)}
        >
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
                src={"/img/tap-game/coin.webp"}
                alt={"coin"}
                className={"mx-2 h-5 w-5"}
              />
              <Info className={"main-text-secondary h-4 w-4"} />
            </div>
          </div>
        </div>
      </div>
      <ShadModal
        isOpen={isOpenModalAboutGainCoin}
        onOpen={setIsOpenModalAboutGainCoin}
      >
        <div className={"flex flex-col items-center justify-center gap-5 pt-2"}>
          <Image
            src={"/img/tap-game/money_bag_earn.webp"}
            alt={"boost earning"}
            width={130}
            height={88}
            className={"h-[88px] w-[130px]"}
          />
          <p className={"main-text-primary text-2xl font-semibold"}>
            {t("boost_your_earning")}
          </p>
          <p
            className={
              "main-text-secondary mx-auto w-[80%] text-center text-sm font-normal"
            }
          >
            <Trans
              t={tMine}
              i18nKey={`des_modal_about_mine`}
              components={{
                // eslint-disable-next-line
                span: <span className="main-text-primary font-semibold" />,
              }}
            />
          </p>
          <p className={"main-text-primary text-base font-bold"}>
            {t("earn_offline")}
          </p>
          <Button
            className={"h-[44px] w-full"}
            onClick={() => router.push("/mine")}
          >
            {t("open_economic")}
          </Button>
        </div>
      </ShadModal>
    </>
  );
};
