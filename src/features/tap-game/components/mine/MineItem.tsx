"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { useBuyMinePack } from "@/features/tap-game/hooks/useBuyMinePack";
import { PackType } from "@/features/tap-game/hooks/useGetListMinePack";
import { useTranslation } from "@/app/[lng]/i18n/client";
import ShadModal from "@/components/ui/ShadModal";
import dayjs from "dayjs";
import { formatDuration, getDurationTime } from "@/utils/formatTime";
import useCountdown from "@/libs/hooks/useCountdown";
import { cn } from "@/utils/cn";

interface MineItemProps {
  id: number;
  name: string;
  imgUrl: string;
  isActive: boolean;
  coinPerHour: number;
  price: number;
  packType: PackType;
  duration: number;
  endTime?: string | null;
}

const MineItem: FC<MineItemProps> = ({
  id,
  coinPerHour,
  name,
  price,
  imgUrl,
  isActive,
  packType,
  duration,
  endTime,
}) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const { t } = useTranslation("mine");
  const { handleBuyPack, loading } = useBuyMinePack(() =>
    setOpenModalConfirm(false),
  );

  useEffect(() => {
    // close modal when after the current pack is expired
    setOpenModalConfirm(false);
  }, [id]);

  const calculateEstimatedProfit = () => {
    const { totalDays, totalHours, totalMinutes, totalSeconds } =
      getDurationTime(duration);

    if (packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND) {
      // Calculate profit based on coins earned per hour
      return Number(coinPerHour) * 24 * Number(totalDays);
    }

    if (packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_TAP) {
      // Calculate profit based on coins earned per tap, assuming 4 taps per second
      const assumingTapsPerSecond = 1;
      const coinPerTap = coinPerHour;
      const totalTaps = totalSeconds * assumingTapsPerSecond; // Total taps during the entire duration
      return coinPerTap * totalTaps;
    }

    // Fallback
    return 0;
  };

  return (
    <>
      <div
        className={
          "my-2 flex w-full items-center justify-between gap-2 rounded bg-[#18181B] px-3 py-2"
        }
      >
        <div className={cn("flex", !isActive ? "opacity-60" : "opacity-100")}>
          <Image
            width={32}
            height={32}
            src={`/img/economic/${imgUrl}.svg`}
            alt={name}
            className={"h-14 w-14 min-w-14 rounded-lg bg-[#27272A] p-2"}
          />
          <div className={"ml-2 flex flex-col"}>
            <p className={"main-text-primary xs:text-base text-sm font-bold"}>
              {name}
            </p>
            <p className={"main-text-secondary text-sm font-normal"}>
              {t(
                packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND
                  ? "coin_per_hour"
                  : "coin_per_tap",
              )}
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
                + {formatNumberWithCommas(coinPerHour, 3)}
              </p>
            </div>
          </div>
        </div>
        <Button
          variant={"secondary"}
          className={
            "flex h-fit max-h-fit w-fit max-w-[107px] items-center justify-center gap-1 !bg-[#3F3F46] px-2"
          }
          onClick={() => setOpenModalConfirm(true)}
        >
          {!isActive ? (
            <>
              <p className={"main-text-secondary text-xs"}>{t("price")}</p>
              <div className={"flex items-center gap-1"}>
                <Image
                  width={12}
                  height={12}
                  src={"/img/tap-game/coin.webp"}
                  alt={"coin"}
                  className={"h-3 w-3"}
                />
                <p className={"main-text-primary text-xs font-bold"}>
                  {formatNumberWithCommas(price)}
                </p>
              </div>
            </>
          ) : (
            <p className={"main-text-secondary text-xs"}>{t("detail")}</p>
          )}
        </Button>
      </div>
      <ShadModal isOpen={openModalConfirm} onOpen={setOpenModalConfirm}>
        <div className={"my-6"}>
          <p className={"mb-6 w-full text-center font-bold"}>{name}</p>
          <Image
            width={76}
            height={76}
            src={`/img/economic/${imgUrl}.svg`}
            alt={name}
            className={
              "mx-auto mb-6 h-[76px] w-[76px] min-w-[76px] rounded-lg bg-[#27272A] p-2"
            }
          />
          <div className={"mb-6 flex w-full flex-col gap-2"}>
            <div className={"flex w-full items-center justify-between"}>
              <div className={"flex flex-col gap-1"}>
                <p className={"main-text-secondary font-normal"}>
                  {t("price")}
                </p>
                <div className={"flex items-center gap-1"}>
                  <Image
                    width={12}
                    height={12}
                    src={"/img/tap-game/coin.webp"}
                    alt={"coin"}
                    className={"h-3 w-3"}
                  />
                  <p className={"main-text-primary text-xs font-bold"}>
                    {formatNumberWithCommas(price)}
                  </p>
                </div>
              </div>
              <div className={"flex flex-col items-end justify-end gap-1"}>
                <p
                  className={"main-text-secondary w-full text-end font-normal"}
                >
                  {t(isActive ? "time_left" : "duration")}
                </p>
                <p className={"main-text-primary text-xs font-bold"}>
                  {isActive ? (
                    <TextTimeEnd endTimeUnix={dayjs(endTime ?? 0).unix()} />
                  ) : (
                    formatDuration(duration)
                  )}
                </p>
              </div>
            </div>
            <div className={"flex w-full items-center justify-between"}>
              <div className={"flex flex-col gap-1"}>
                <p className={"main-text-secondary font-normal"}>
                  {packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND
                    ? "Coin per hour"
                    : "Coin per tap"}
                </p>
                <div className={"flex items-center gap-1"}>
                  <Image
                    width={12}
                    height={12}
                    src={"/img/tap-game/coin.webp"}
                    alt={"coin"}
                    className={"h-3 w-3"}
                  />
                  <p className={"main-text-primary text-xs font-bold"}>
                    +{formatNumberWithCommas(coinPerHour, 3)}/
                    {packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND
                      ? "h"
                      : "tap"}
                  </p>
                </div>
              </div>
              <div className={"flex flex-col items-end justify-end gap-1"}>
                <p
                  className={"main-text-secondary w-full text-end font-normal"}
                >
                  {t("est_earn")}
                </p>
                <div className={"flex items-center gap-1"}>
                  <Image
                    width={12}
                    height={12}
                    src={"/img/tap-game/coin.webp"}
                    alt={"coin"}
                    className={"h-3 w-3"}
                  />
                  <p className={"main-text-primary text-xs font-bold"}>
                    {calculateEstimatedProfit() !== 0
                      ? `+${formatNumberWithCommas(calculateEstimatedProfit(), 3)}`
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {!isActive && (
            <Button
              disabled={loading || isActive}
              loading={loading}
              onClick={() => handleBuyPack(id, packType, price)}
              className={"mb-4 w-full rounded"}
            >
              {t("buy")}
            </Button>
          )}
          <Button
            variant={isActive ? "default" : "outline"}
            className={"w-full rounded"}
            onClick={() => setOpenModalConfirm(false)}
          >
            {t("cancel")}
          </Button>
        </div>
      </ShadModal>
    </>
  );
};

const TextTimeEnd = ({ endTimeUnix }: { endTimeUnix: number }) => {
  const { days, hours, minutes, seconds } = useCountdown(endTimeUnix * 1000);
  return <p>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</p>;
};
export default MineItem;
