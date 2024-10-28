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
        className={cn(
          "relative flex w-full flex-col rounded-xl bg-white p-4 md:w-[calc(50%-8px)]",
          "border transition-all duration-200",
          isActive
            ? "border-blue-200 shadow-lg"
            : "border-gray-100 hover:border-gray-200",
          !isActive && "hover:shadow-md",
        )}
      >
        {/* Card Header */}
        <div className="w-full items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            {isActive && (
              <p className="text-sm font-medium text-blue-600">
                <TextTimeEnd endTimeUnix={dayjs(endTime ?? 0).unix()} />
              </p>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="my-4 w-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND
                ? "Coin per hour"
                : "Coin per tap"}
            </span>
            <div className="flex items-center gap-1.5">
              <Image
                width={20}
                height={20}
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                alt="coin"
                className="h-5 w-5"
              />
              <span className="font-bold text-gray-900">
                +{formatNumberWithCommas(coinPerHour, 3)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Price</span>
            <div className="flex items-center gap-1.5">
              <Image
                width={16}
                height={16}
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                alt="coin"
                className="h-5 w-5"
              />
              <span className="font-bold text-gray-900">
                {formatNumberWithCommas(price)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Duration</span>
            <span className="font-medium text-gray-900">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        {/* Card Action */}
        <Button
          variant={isActive ? "outline" : "default"}
          className={cn(
            "mt-auto w-full rounded-lg",
            isActive
              ? "border-blue-200 text-blue-600 hover:bg-blue-50"
              : "bg-blue-600 text-white hover:bg-blue-700",
          )}
          onClick={() => setOpenModalConfirm(true)}
        >
          {!isActive ? "Buy Now" : "View Details"}
        </Button>
      </div>

      <ShadModal isOpen={openModalConfirm} onOpen={setOpenModalConfirm}>
        <div className="relative p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            {isActive && (
              <p className="mt-2 text-sm font-medium text-blue-600">
                <TextTimeEnd endTimeUnix={dayjs(endTime ?? 0).unix()} />
              </p>
            )}
          </div>

          {/* Content */}
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="space-y-4">
              {/* Price Info */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Price</span>
                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-sm">
                  <Image
                    width={18}
                    height={18}
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                    alt="coin"
                    className="h-[18px] w-[18px]"
                  />
                  <span className="font-bold text-gray-900">
                    {formatNumberWithCommas(price)}
                  </span>
                </div>
              </div>

              {/* Duration Info */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {isActive ? "Time Left" : "Duration"}
                </span>
                <div className="rounded-lg bg-white px-3 py-1.5 shadow-sm">
                  <span className="font-bold text-gray-900">
                    {isActive ? (
                      <TextTimeEnd endTimeUnix={dayjs(endTime ?? 0).unix()} />
                    ) : (
                      formatDuration(duration)
                    )}
                  </span>
                </div>
              </div>

              {/* Earning Rate */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND
                    ? "Coin per hour"
                    : "Coin per tap"}
                </span>
                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-sm">
                  <Image
                    width={18}
                    height={18}
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                    alt="coin"
                    className="h-[18px] w-[18px]"
                  />
                  <span className="font-bold text-blue-600">
                    +{formatNumberWithCommas(coinPerHour, 3)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Earnings */}
          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">
                Estimated Earnings
              </span>
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-sm">
                <Image
                  width={18}
                  height={18}
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                  alt="coin"
                  className="h-[18px] w-[18px]"
                />
                <span className="font-bold text-blue-600">
                  {calculateEstimatedProfit() !== 0
                    ? `+${formatNumberWithCommas(calculateEstimatedProfit(), 3)}`
                    : "--"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            {!isActive && (
              <Button
                disabled={loading}
                loading={loading}
                onClick={() => handleBuyPack(id, packType, price)}
                className="w-full rounded-xl bg-blue-600 py-3 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
              >
                Buy Now
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full rounded-xl border-2 border-gray-200 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              onClick={() => setOpenModalConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ShadModal>
    </>
  );
};

const TextTimeEnd = ({ endTimeUnix }: { endTimeUnix: number }) => {
  const { days, hours, minutes, seconds } = useCountdown(endTimeUnix * 1000);
  return (
    <span className="text-blue-600">
      {`${days}d ${hours}h ${minutes}m ${seconds}s`}
    </span>
  );
};
export default MineItem;
