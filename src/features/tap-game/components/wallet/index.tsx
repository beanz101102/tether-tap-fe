"use client";
import NextImage from "@/components/common/next-image";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai/index";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ListHistory from "./ListHistory";
import SelectChain from "./SelectChain";
import Link from "next/link";

const Wallet = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });
  const { currentUser } = useGetCurrentUser();
  const [score] = useAtom(ScoreAtom);

  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      <div
        className={
          "main-border-color flex w-full items-center justify-between border-b py-4"
        }
      >
        <div className={"flex items-center px-4"}>
          <NextImage
            className={"h-10 w-10 rounded-full"}
            src={currentUser?.avatar as string}
            alt={currentUser?.name as string}
          />
          <p className={"main-text-secondary pl-1 text-base font-medium"}>
            {currentUser?.name}
          </p>
        </div>
        <SelectChain />
      </div>
      <p className={"main-text-secondary mt-5 text-center text-sm font-medium"}>
        {" "}
        {t("balance")}
      </p>
      <div className={"flex items-center"}>
        <NextImage
          className={"h-[36px] w-[36px]"}
          src={"/img/tap-game/coin.svg"}
          alt={"coin"}
        />
        <p className={"main-text-primary pl-2 text-5xl font-semibold"}>
          {formatNumberWithCommas(score)}
        </p>
      </div>
      <div className="mt-6 flex">
        <Link href={"/wallet/withdraw"}>
          <Button className="mr-2 !w-[128px] rounded-full" variant={"outline"}>
            {t("withdraw")}
          </Button>
        </Link>
        <Link href={"/wallet/deposit"}>
          <Button className="!w-[128px] rounded-full" variant={"common"}>
            {t("deposit")}
          </Button>
        </Link>
      </div>
      <div className="mt-3 flex items-center">
        <ExternalLink className="main-text-brand mr-1 h-4 w-4" />
        <p className="main-text-brand">{t("view_explorer")}</p>
      </div>
      <ListHistory />
    </div>
  );
};

export default Wallet;
