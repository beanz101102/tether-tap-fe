/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChevronRight } from "lucide-react";

import { useMemo } from "react";
import { maxLevelUpgrade } from "../../constants/tap-game";
import { useTranslation } from "@/app/[lng]/i18n/client";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import NextImage from "@/components/common/next-image";
import { cn } from "@/utils/cn";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import ModalUpgrade, {
  ModalUpgradeType,
} from "@/features/tap-game/components/Boost/ModalUpgrade";
import { useModal } from "@/libs/hooks/useModal";
import { preventBubbling } from "@/utils/preventBubbling";

export interface ItemBoostProps {
  img: string;
  coins: number;
  level: number;
  title: string;
  increaseEnergy?: number;
  increaseCoinsPerTap?: number;
}

const ItemBoost = ({
  img,
  coins,
  level,
  title,
  increaseEnergy,
  increaseCoinsPerTap,
}: ItemBoostProps) => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "boost",
  });
  const isMax = useMemo(() => level === maxLevelUpgrade, [level]);
  const isMultitap = useMemo(() => title === "multitap", [title]);
  const { open, setOpen, openModal } = useModal();

  // () => {
  //   // if (isMax || !level || !coins) return;
  //   openModal();
  // }
  return (
    <div>
      <div
        onClick={preventBubbling(() => {
          // if (!open) return;
          openModal();
        })}
        style={{
          boxShadow: "0px 3px 0px 0px #3F3F46",
        }}
        className={cn(
          "main-bg-secondary flex w-full  justify-between rounded-lg px-4 py-2",
          isMax ? "cursor-no-drop" : "cursor-pointer",
        )}
      >
        <div className={"flex items-center"}>
          <NextImage
            className={cn("h-8 w-8")}
            src={`/img/tap-game/${img}`}
            alt={img}
          />
          <div className={cn("pl-2")}>
            <p className={"main-text-primary text-base font-medium"}>
              {t(title)}
            </p>
            <WrapSkeleton
              isSkeleton={!level || !coins}
              className={"mt-2 h-[15px]"}
            >
              {isMax ? (
                <p className={"main-text-secondary text-sm font-normal"}>
                  {t("maxed")}
                </p>
              ) : (
                <div
                  className={cn("mt-1 flex items-center", isMax && "grayscale")}
                >
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
              )}
            </WrapSkeleton>
          </div>
        </div>
        <button disabled={isMax}>
          <ChevronRight className={"main-text-secondary h-6 w-6"} />
        </button>
      </div>
      <ModalUpgrade
        data={{
          img,
          coins,
          level,
          title,
          increaseEnergy: increaseEnergy ?? 0,
          increaseCoinsPerTap: increaseCoinsPerTap ?? 0,
        }}
        isOpen={open}
        setOpen={setOpen}
        type={isMultitap ? ModalUpgradeType.TAP : ModalUpgradeType.ENERGY}
      />
    </div>
  );
};

export default ItemBoost;
