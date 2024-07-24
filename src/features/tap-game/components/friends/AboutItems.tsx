import { useTranslation } from "@/app/[lng]/i18n/client";
import { useGetAmountRewardReferral } from "../../hooks/useGetAmountRewardReferral";
import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";

const AboutRewardItem = ({ type }: { type: "normal" | "premium" }) => {
  const { normal, premium } = useGetAmountRewardReferral();
  const { t } = useTranslation("tap-game", {
    keyPrefix: "friends",
  });

  return (
    <div
      className={
        "main-bg-blue-op mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-2"
      }
    >
      <NextImage
        src={`/img/tap-game/${type === "normal" ? "star" : "star-premium"}.svg`}
        alt={"star"}
        className={"h-8 w-8"}
      />
      <div className={"flex w-full flex-col"}>
        <p className={"main-text-primary w-full text-sm font-semibold"}>
          {type === "normal"
            ? t("rewards.normal_title")
            : t("rewards.premium_title")}
        </p>

        <div className="flex flex-wrap items-start">
          <NextImage
            src={"/img/tap-game/coin.svg"}
            alt={"coin"}
            className={"mt-1 h-5 w-5"}
          />
          <div className="flex-1">
            <span className={"main-text-primary pl-1 text-sm font-semibold"}>
              +{formatNumberWithCommas(type === "normal" ? normal : premium)}
              <span className={"main-text-secondary pl-1 text-sm font-normal"}>
                {type === "normal" ? t("rewards.normal") : t("rewards.premium")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRewardItem;
