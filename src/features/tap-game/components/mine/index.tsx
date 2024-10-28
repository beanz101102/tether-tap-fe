"use client";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AnimatedNumber from "@/components/ui/animated-number";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import Holder from "@/features/tap-game/components/mine/Holder";
import Tapper from "@/features/tap-game/components/mine/Tapper";
import { useGetCurrentBalance } from "@/features/tap-game/hooks/useGetCurrentBalance";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { cn } from "@/utils/cn";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import Image from "next/image";

enum EconomyType {
  HOLDER = "holder",
  TAPPER = "tapper",
}

const Mine = () => {
  return (
    <div>
      <MinePageHeader />
      <MinePageContent />
    </div>
  );
};

const MinePageContent = () => {
  const { t } = useTranslation("mine");
  return (
    <Tabs defaultValue={EconomyType.HOLDER} className="mt-5 w-full px-2">
      <TabsList className="w-full justify-between rounded-xl bg-gray-100/80 p-1.5">
        <TabsTrigger
          className={cn(
            "flex h-10 w-[50%] items-center justify-center rounded-lg",
            "transition-all duration-200",
            "text-sm font-medium",
            "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
            "data-[state=inactive]:text-gray-600 hover:data-[state=inactive]:bg-gray-50",
          )}
          value={EconomyType.HOLDER}
        >
          <div className="flex items-center gap-2">
            <span>{t("holder")}</span>
          </div>
        </TabsTrigger>
        <TabsTrigger
          className={cn(
            "flex h-10 w-[50%] items-center justify-center rounded-lg",
            "transition-all duration-200",
            "text-sm font-medium",
            "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
            "data-[state=inactive]:text-gray-600 hover:data-[state=inactive]:bg-gray-50",
          )}
          value={EconomyType.TAPPER}
        >
          <div className="flex items-center gap-2">
            <span>{t("tapper")}</span>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={EconomyType.HOLDER} className="mt-4 w-full !pb-5">
        <Holder />
      </TabsContent>
      <TabsContent value={EconomyType.TAPPER} className="mt-4 w-full !pb-5">
        <Tapper />
      </TabsContent>
    </Tabs>
  );
};

const MinePageHeader = () => {
  const { t } = useTranslation("mine");
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const { isLoading } = useGetUserTapGameInfo();
  const score = useGetCurrentBalance();

  return (
    <div className={"w-full"}>
      <p
        className={
          "main-text-secondary mt-6 w-full text-center text-sm font-medium"
        }
      >
        {t("earn_per_hour")}
      </p>
      <div className={"mb-3 h-full w-full px-4 pt-3"}>
        <div className={"flex items-center justify-center"}>
          <Image
            width={32}
            height={32}
            src={"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"}
            alt={"coin"}
            className={"mr-2"}
          />
          <p className={"main-text-primary text-[30px] font-bold"}>
            +
            {formatNumberWithCommas(
              userTapGameInfo?.coins_bonus_per_hour ?? 0,
              3,
            )}
          </p>
        </div>
      </div>

      <p
        className={
          "main-text-secondary my-1 w-full text-center text-xs font-medium"
        }
      >
        {t("boost_economic")}
      </p>
    </div>
  );
};

export default Mine;
