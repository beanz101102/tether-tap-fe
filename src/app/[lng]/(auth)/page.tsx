"use client";

import AnimatedNumber from "@/components/ui/animated-number";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import TapArea from "@/features/tap-game/components/TapArea";
import {ScoreAtom} from "@/features/tap-game/constants/tap-game";
import {useGetUserTapGameInfo} from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import {useAtom} from "jotai";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {Info} from "lucide-react";
import EnergyProgress from "@/features/tap-game/components/EnergyProgress";
import ShadModal from "@/components/ui/ShadModal";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export default function Home() {
  const [score] = useAtom(ScoreAtom);
  const { isLoading } = useGetUserTapGameInfo();

  return (
    <div
      style={{
        backgroundColor: "black",
        boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.25)",
        backgroundImage: "url(/img/tap-game/tap-bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative h-[100vh]"
    >
      <TapPageHeader />
      <div className={""}>
        <p className={'w-full text-center text-sm font-medium mt-6 main-text-secondary'}>Your coin balance</p>
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

        <div className="">
          <TapArea mainCoinClassName={""} />
        </div>
        <div className={"absolute bottom-[90px] mb-2 left-0 w-full px-4"}>
          <EnergyProgress />
        </div>
      </div>
    </div>
  );
}

const TapPageHeader = () => {
  const [isOpenModalAboutGainCoin, setIsOpenModalAboutGainCoin] = useState(false);
  const { t } = useTranslation("tap-game");
  const { userTapGameInfo } = useGetUserTapGameInfo();


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
          onClick={() => setIsOpenModalAboutGainCoin(true)}
        >
          <div className={"main-border-divider-secondary h-[35px] border-l"} />
          <div className={"w-full flex flex-col items-end px-3 py-2"}>
            <p className={"main-text-secondary text-xs font-medium"}>
              {t("coin_to_level_up")}
            </p>
            <div className={"flex items-center justify-center"}>
              <p className={"main-text-primary font-bold"}>0</p>
              <Image
                width={20}
                height={20}
                src={"/img/tap-game/coin.svg"}
                alt={"coin"}
                className={"mx-2 h-5 w-5"}
              />
              <Info className={'main-text-secondary w-4 h-4'} />
            </div>
          </div>
        </div>
      </div>
      <ShadModal isOpen={isOpenModalAboutGainCoin} onOpen={setIsOpenModalAboutGainCoin}>
        <div className={'flex flex-col items-center justify-center gap-5 pt-2'}>
          <Image
            src={"/img/tap-game/multi-tether-coin.svg"}
            alt={'boost earning'}
            width={130}
            height={88}
            className={'w-[130px] h-[88px]'}
          />
          <p className={'main-text-primary text-2xl font-semibold'}>Boost your earnings</p>
          <p className={'main-text-secondary text-sm font-normal w-full text-center'}>
            Tap the <span className={'main-text-primary'}>Economic</span> menu and buy upgrades
            for your kingdom
          </p>
          <p className={'main-text-primary text-base font-bold'}>Earn offline up to 4 hours.</p>
          <Button
            className={'w-full h-[44px]'}
            onClick={() => setIsOpenModalAboutGainCoin(false)}
          >
            Open Economic
          </Button>
        </div>
      </ShadModal>
    </>
  );
};
