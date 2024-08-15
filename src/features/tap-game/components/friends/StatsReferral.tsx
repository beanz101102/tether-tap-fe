import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { useTranslation } from "@/app/[lng]/i18n/client";

const StatsReferral = () => {
  return (
    <div className="flex w-full items-stretch justify-between">
      <div className="w-[49%]">
        <ItemStatsReferral title={"normal_title"} value={0.00001} />
      </div>
      <div className="w-[49%]">
        <ItemStatsReferral title={"premium_title"} value={0.00002} />
      </div>
    </div>
  );
};

const ItemStatsReferral = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "friends",
  });
  return (
    <div className="main-bg-primary flex h-full flex-col justify-between rounded-lg border border-[#45887A] px-3 py-2">
      <p className="main-text-secondary text-sm font-normal">
        {t(`rewards.${title}`)}
      </p>
      <div className="mt-1 flex items-center">
        <NextImage
          className="h-6 w-6"
          width={24}
          height={24}
          src={"/img/tap-game/coin.webp"}
          alt={"usdt"}
        />
        <p className="main-text-warning pl-1 text-base font-bold">
          + {formatNumberWithCommas(value)}
        </p>
      </div>
    </div>
  );
};

export default StatsReferral;
