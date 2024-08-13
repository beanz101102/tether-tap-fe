"use client";
import Image from "next/image";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import AnimatedNumber from "@/components/ui/animated-number";
import { useAtom } from "jotai/index";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import Holder from "@/features/tap-game/components/mine/Holder";
import Tapper from "@/features/tap-game/components/mine/Tapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {useTranslation} from "@/app/[lng]/i18n/client";
import {formatNumberWithCommas} from "@/utils/formatNumber";

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
  const {t} =  useTranslation('mine');
  return (
    <Tabs
      defaultValue={EconomyType.HOLDER}
      className="mt-5 h-[40px] w-full px-2"
    >
      <TabsList className="main-bg-secondary w-full justify-between rounded-lg p-1">
        <TabsTrigger
          className="xxxs:text-sm xxs:text-base main-text-primary data-[state=active]:main-bg-default flex h-[40px] w-[50%] items-center justify-center rounded-lg"
          value={EconomyType.HOLDER}
        >
          <p
            className={"main-text-red max-w-full truncate text-xs font-medium"}
          >
            {t('holder')}
          </p>
        </TabsTrigger>
        <TabsTrigger
          className="xxxs:text-sm xxs:text-base main-text-primary data-[state=active]:main-bg-default flex h-[40px] w-[50%] items-center justify-center rounded-lg"
          value={EconomyType.TAPPER}
        >
          <p
            className={"main-text-red max-w-full truncate text-xs font-medium"}
          >
            {t('tapper')}
          </p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={EconomyType.HOLDER} className="w-full pb-10">
        <Holder />
      </TabsContent>
      <TabsContent value={EconomyType.TAPPER} className="w-full pb-10">
        <Tapper />
      </TabsContent>
    </Tabs>
  );
};

const MinePageHeader = () => {
  const {t} = useTranslation('mine');
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const [score] = useAtom(ScoreAtom);
  const { isLoading } = useGetUserTapGameInfo();

  return (
    <div className={"w-full"}>
      <p
        className={
          "main-text-secondary mt-6 w-full text-center text-sm font-medium"
        }
      >
        {t('your_coin_balance')}
      </p>
      <div className={"mb-3 h-full w-full px-4 pt-3"}>
        <div className={"flex items-center justify-center"}>
          <Image
            width={32}
            height={32}
            src={"/img/tap-game/coin.webp"}
            alt={"coin"}
            className={"mr-2"}
          />
          <WrapSkeleton className={"h-[25px] w-[60px]"} isSkeleton={isLoading}>
            <AnimatedNumber
              value={Number(score ?? 0)}
              hasComma={true}
              size={30}
              duration={200}
            />
          </WrapSkeleton>
        </div>
      </div>

      <div className={"flex items-center justify-center gap-2"}>
        <div
          className={
            "flex w-[48%] flex-col items-center justify-center gap-1 rounded-lg bg-[#18181B] py-2"
          }
        >
          <p className={"main-text-secondary text-xs font-medium"}>
            {t('earn_per_hour')}
          </p>
          <div className={"flex items-center gap-1"}>
            <Image
              width={20}
              height={20}
              src={"/img/tap-game/coin.webp"}
              alt={"coin"}
              className={"mr-2 h-5 w-5"}
            />
            <p className={"main-text-primary font-bold"}>
              +{formatNumberWithCommas(userTapGameInfo?.coins_bonus_per_hour ?? 0, 3)}
            </p>
          </div>
        </div>

        <div
          className={
            "flex w-[48%] flex-col items-center justify-center gap-1 rounded-lg bg-[#18181B] py-2"
          }
        >
          <p className={"main-text-secondary text-xs font-medium"}>
            {t('earn_per_tap')}
          </p>
          <div className={"flex items-center gap-1"}>
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
      </div>
      <p
        className={
          "main-text-secondary my-1 w-full text-center text-xs font-medium"
        }
      >
        {t('boost_economic')}
      </p>
      <p className={"main-text-primary w-full text-center text-sm font-normal"}>
        {t('earn_offline')}
      </p>
    </div>
  );
};

export default Mine;
