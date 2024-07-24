"use client";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { useAtom } from "jotai";
import {
  ScoreAtom,
  listUpgradeCoinsPerTap,
  listUpgradeEnergyByLevel,
} from "../../constants/tap-game";
import { useModal } from "@/libs/hooks/useModal";
import { useMemo, useState } from "react";
import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { useGetUserTapGameInfo } from "../../hooks/useGetUserTapGameInfo";
import ModalUpgrade, {
  ModalUpgradeType,
} from "@/features/tap-game/components/Boost/ModalUpgrade";
import ItemBoost from "./ItemBoost";

const Boost = () => {
  const [score] = useAtom(ScoreAtom);
  const { t } = useTranslation("tap-game", {
    keyPrefix: "boost",
  });
  const { open, setOpen } = useModal();
  const balance = useMemo(() => score, [score]);
  const [typeModal, setTypeModal] = useState<ModalUpgradeType>(
    ModalUpgradeType.TAP,
  );
  const { userTapGameInfo } = useGetUserTapGameInfo();

  const upgradeMultitapDetail = useMemo(() => {
    return listUpgradeCoinsPerTap?.find((e) => {
      return (
        e?.Level === Number(userTapGameInfo?.coins_per_tap_level) + 1 ||
        (listUpgradeCoinsPerTap[listUpgradeCoinsPerTap?.length - 1]?.Level ===
          Number(userTapGameInfo?.coins_per_tap_level) &&
          Number(userTapGameInfo?.coins_per_tap_level) === e?.Level)
      );
    });
  }, [userTapGameInfo?.coins_earned_per_tap]);

  const upgradeEnergyDetail = useMemo(() => {
    return listUpgradeEnergyByLevel?.find((e) => {
      return (
        e?.Level === Number(userTapGameInfo?.max_energy_level) + 1 ||
        (listUpgradeEnergyByLevel[listUpgradeEnergyByLevel?.length - 1]
          ?.Level === Number(userTapGameInfo?.max_energy_level) &&
          Number(userTapGameInfo?.max_energy_level) === e?.Level)
      );
    });
  }, [userTapGameInfo?.max_energy_reached]);

  const listBoost = [
    {
      title: "multitap",
      img: "tap.webp",
      coins: Number(upgradeMultitapDetail?.CoinsNeeded),
      level: Number(upgradeMultitapDetail?.Level),

      increaseCoinsPerTap:
        Number(upgradeMultitapDetail?.CoinsPerTap) +
        Number(userTapGameInfo?.coins_earned_per_tap),
    },
    {
      title: "energy_limit",
      img: "muscle_limit.webp",
      coins: Number(upgradeEnergyDetail?.CoinsNeeded),
      level: Number(upgradeEnergyDetail?.Level),
      increaseEnergy: Number(upgradeEnergyDetail?.MaxEnergy),
    },
  ];

  return (
    <div className={"flex w-full flex-col items-center justify-center p-4"}>
      <p className={"main-text-secondary text-sm font-normal"}>
        {t("your_balance")}
      </p>
      <div className={"mt-2.5 flex items-center"}>
        <NextImage
          src={"/img/tap-game/coin.svg"}
          alt={"coin"}
          className={"h-10 w-10"}
        />
        <p className={"main-text-primary pl-2 text-3xl font-semibold"}>
          {formatNumberWithCommas(balance)}
        </p>
      </div>
      <div className={"mb-2 w-full"}>
        {/* <DailyBoost /> */}
        <p className={"main-text-primary mt-6 text-base font-medium"}>
          {t("title")}
        </p>
      </div>
      <div className={"w-full"}>
        {listBoost?.map((e, idx) => {
          return (
            <div className={"mb-3 w-full"} key={`item-boost-${idx}`}>
              <ItemBoost {...e} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Boost;
