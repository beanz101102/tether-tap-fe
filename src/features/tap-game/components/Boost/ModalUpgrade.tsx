import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { ScoreAtom, UserTapGameInfo } from "../../constants/tap-game";
import { useAtom } from "jotai";
import { useGetUserTapGameInfo } from "../../hooks/useGetUserTapGameInfo";
import { useUpgradeCoinsPerTap } from "../../hooks/useUpgradeCoinsPerTap";
import { useUpgradeEnergyByLevel } from "../../hooks/useUpgradeEnergyByLevel";
import { useTranslation } from "@/app/[lng]/i18n/client";
import ShadModal from "@/components/ui/ShadModal";
import NextImage from "@/components/common/next-image";
import { cn } from "@/utils/cn";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Button } from "@/components/ui/button";
import { ItemBoostProps } from "./ItemBoost";

export enum ModalUpgradeType {
  TAP,
  ENERGY,
}

const ModalUpgrade = ({
  isOpen,
  type,
  setOpen,
  data: dataDetail,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: ModalUpgradeType;
  data: ItemBoostProps;
}) => {
  const [score] = useAtom(ScoreAtom);
  const [showErr, setShowErr] = useState(false);
  const { setUserTabGameInfo, userTapGameInfo } = useGetUserTapGameInfo();
  const { coins, level, increaseEnergy, increaseCoinsPerTap } = dataDetail;

  const { handleUpgradeCoinsPerTap } = useUpgradeCoinsPerTap(() => {
    setUserTabGameInfo({
      ...(userTapGameInfo as UserTapGameInfo),
      coins_earned_per_tap: Number(increaseCoinsPerTap),
      coins_per_tap_level: level,
    });
    setOpen(false);
  });
  const { handleUpgradeEnergyByLevel } = useUpgradeEnergyByLevel(() => {
    setUserTabGameInfo({
      ...(userTapGameInfo as UserTapGameInfo),
      max_energy_reached:
        Number(userTapGameInfo?.max_energy_reached) + Number(increaseEnergy),
      max_energy_level: level,
    });
    setOpen(false);
  });

  const { t } = useTranslation("tap-game", {
    keyPrefix: "upgrade",
  });
  const { t: tMenu } = useTranslation("tap-game", {
    keyPrefix: "menu",
  });
  const { t: tAll } = useTranslation("tap-game");
  const isUpgradeTap = type === ModalUpgradeType.TAP;

  const handleUpgrade = () => {
    if (Number(score) < coins) {
      setShowErr(true);
      return;
    }
    switch (type) {
      case ModalUpgradeType.TAP:
        handleUpgradeCoinsPerTap(level);
        return;
      case ModalUpgradeType.ENERGY:
        handleUpgradeEnergyByLevel(level);
    }
  };

  useEffect(() => {
    return () => {
      setShowErr(false);
    };
  }, [isOpen]);

  return (
    <ShadModal isOpen={isOpen} onOpen={setOpen}>
      <Suspense>
        <div className={"flex w-full flex-col items-center pb-2"}>
          <p
            className={
              "main-text-primary mt-4 text-center text-2xl font-semibold"
            }
          >
            {t(isUpgradeTap ? "upgrade_multitap" : "upgrade_energy")}
          </p>
          <NextImage
            className={cn("mt-6 h-[80px] w-[80px]")}
            width={80}
            height={80}
            src={`/img/tap-game/${isUpgradeTap ? "tap.webp" : "muscle_limit.webp"}`}
            alt={"upgrade"}
          />
          <div className={cn("mt-4 flex items-center")}>
            <p className={"main-text-primary pr-1 text-lg font-semibold"}>
              +
              {isUpgradeTap
                ? 1000
                : formatNumberWithCommas(increaseEnergy ?? 0)}{" "}
              {isUpgradeTap && tAll("earn_per_tap")}
            </p>
            {!isUpgradeTap && (
              <NextImage
                className={"h-6 w-6"}
                src={`/img/tap-game/energy.webp`}
                alt={"energy"}
              />
            )}
          </div>
          <p className={cn("main-text-secondary mt-3 text-sm font-normal")}>
            {t("cost")}
          </p>
          <div className={"mt-1 flex items-center"}>
            <NextImage
              src={"/img/tap-game/coin.webp"}
              className={"h-[16px] w-[16px]"}
              alt={"coin"}
            />
            <p className={"main-text-primary pl-1 text-sm font-semibold"}>
              {formatNumberWithCommas(coins)}
            </p>
            <div className={"main-border-color ml-3 border-l pl-3"}>
              <p className={"main-text-secondary text-sm font-normal"}>
                Lv{level}
              </p>
            </div>
          </div>
          {showErr && (
            <p className={"main-text-danger mt-2 text-sm"}>
              {t("err_balance")}
            </p>
          )}
          <Button
            style={{
              boxShadow: "0px 3px 0px 0px #047857",
            }}
            className={"mt-6 w-full rounded-md !bg-[#059669] !text-white"}
            onClick={handleUpgrade}
          >
            {t("title")}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            style={{
              boxShadow: "0px 3px 0px 0px #3F3F46",
            }}
            className={"mt-4 w-full rounded-md !bg-[#3F3F46] !text-white"}
          >
            {t("cancel")}
          </Button>
        </div>
      </Suspense>
    </ShadModal>
  );
};

export default ModalUpgrade;
