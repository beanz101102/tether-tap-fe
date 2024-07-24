"use client";
import NextImage from "@/components/common/next-image";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useAtom } from "jotai/index";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import SelectChain from "../SelectChain";
import ListHistory from "../ListHistory";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { truncateAddress } from "@/utils/truncateAddress";

const Deposit = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });

  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      <p className="main-text-primary pt-6 text-center text-4xl font-semibold">
        {t("deposit")}
      </p>
      <p className="main-text-secondary text-center text-sm font-normal">
        {t("des_deposit")}
      </p>

      <div className="w-full">
        <p className="main-text-primary mb-[2px] text-sm font-medium">
          {t("chain")}
        </p>
        <SelectChain />
      </div>
      <div className="mt-4 w-full">
        <p className="main-text-primary mb-[2px] text-sm font-medium">
          {t("address")}
        </p>
        <div className="flex items-center justify-between">
          <div className="main-bg-default main-text-primary main-border-color w-[60%] rounded-md border px-3 py-2 text-base font-normal">
            {truncateAddress("0x53454ed75a71E8623DF3034dCa7De46eE3393e79", 10)}
          </div>
          <Button variant={"common"} className="!w-[30%]">
            {t("copy")}
          </Button>
        </div>
      </div>
      <ListHistory title="deposit_history" />
    </div>
  );
};

export default Deposit;
