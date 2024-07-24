"use client";
import Image from "next/image";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import AnimatedNumber from "@/components/ui/animated-number";
import {useAtom} from "jotai/index";
import {ScoreAtom} from "@/features/tap-game/constants/tap-game";
import {useGetUserTapGameInfo} from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import Holder from "@/features/tap-game/components/mine/Holder";
import Tapper from "@/features/tap-game/components/mine/Tapper";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";

enum EconomyType {
  HOLDER = 'holder',
  TAPPER = 'tapper',
}

const Mine = () => {
  return (
    <div>
      <MinePageHeader />
      <MinePageContent />
    </div>
  )
}

const MinePageContent = () => {
  return (
    <Tabs defaultValue={EconomyType.HOLDER} className="w-full h-[40px] px-2 mt-5">
      <TabsList className="p-1 w-full rounded-lg main-bg-secondary justify-between">
        <TabsTrigger
          className="w-[50%] h-[40px] xxxs:text-sm xxs:text-base main-text-primary rounded-lg flex justify-center items-center data-[state=active]:main-bg-default"
          value={EconomyType.HOLDER}>
          <p className={'main-text-red text-xs font-medium max-w-full truncate'}>Holder</p>
        </TabsTrigger>
        <TabsTrigger
          className="w-[50%] h-[40px] xxxs:text-sm xxs:text-base main-text-primary rounded-lg flex justify-center items-center data-[state=active]:main-bg-default"
          value={EconomyType.TAPPER}>
          <p className={'main-text-red text-xs font-medium max-w-full truncate'}>Tapper</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={EconomyType.HOLDER} className="w-full">
        <Holder />
      </TabsContent>
      <TabsContent value={EconomyType.TAPPER} className="w-full">
        <Tapper />
      </TabsContent>
    </Tabs>
  )
}

const MinePageHeader = () => {
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const [score] = useAtom(ScoreAtom);
  const { isLoading } = useGetUserTapGameInfo();

  return (
    <div className={'w-full'}>
      <p className={'w-full text-center text-sm font-medium mt-6 main-text-secondary'}>Your coin balance</p>
      <div className={"mb-3 h-full w-full px-4 pt-3"}>
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

      <div className={'flex items-center justify-center gap-2'}>
        <div className={'w-[48%] py-2 flex flex-col items-center justify-center gap-1 rounded-lg bg-[#18181B]'}>
          <p className={'main-text-secondary text-xs font-medium'}>Earn per hour</p>
          <div className={'flex items-center gap-1'}>
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

        <div className={'w-[48%] py-2 flex flex-col items-center justify-center gap-1 rounded-lg bg-[#18181B]'}>
          <p className={'main-text-secondary text-xs font-medium'}>Earn per tap</p>
          <div className={'flex items-center gap-1'}>
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
      </div>
      <p className={'w-full text-center main-text-secondary my-1 text-xs font-medium'}>
        Boost economic and earn hourly.
      </p>
      <p className={'w-full text-center main-text-primary text-sm font-normal'}>Earn offline up to 1 hours.</p>
    </div>
  )
}

export default Mine;