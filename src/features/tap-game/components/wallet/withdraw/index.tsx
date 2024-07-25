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
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Withdraw = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("")
  const max = 0.5
  const minWithdraw = 0.5
  const balance = 1.22
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });

  const onMax = () => {
      setAmount(String(balance))
  }

  return (
    <div className={"flex w-full flex-col items-center justify-center px-4"}>
      <p className="main-text-primary pt-6 text-center text-4xl font-semibold">
        {t("withdraw")}
      </p>
      <p className="main-text-secondary text-center text-sm font-normal">
        {t("des_withdraw")}
      </p>

      <div className="w-full">
        <p className="main-text-primary mb-[2px] text-sm font-medium">
          {t("chain")}
        </p>
        <SelectChain />
      </div>
      <div className="mt-4 w-full">
        <Input
          onChange={(e) => {
              setAddress(e?.target?.value);
          }}
          value={address}
          className="main-border-color w-full main-text-primary border"
          placeholder={t("enter_address_wallet")}
        />
      </div>
      <div className="main-bg-default main-text-secondary font-normal main-border-color mt-5 w-full rounded-lg border px-2 py-3 text-sm">
        <p className="main-text-secondary text-sm font-normal">{t("amount")}</p>
        <div className="flex items-center justify-between">
          <Input
            onChange={(e) => {
                  setAmount(e?.target?.value);
              }}
            value={amount}
            placeholder="0.0"
            className="w-[60%] main-text-primary border-none !pl-0 text-[20px]"
          />
          <div className="flex">
            <NextImage
              className="h-5 mr-2 w-5"
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
              alt="usdt logo"
            />
            USDT
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="main-text-muted">{t("min")}: {formatNumberWithCommas(minWithdraw)} USDT</p>
          <div className="flex">
            <p>{t("balance")}: {formatNumberWithCommas(balance)}</p>
            <button onClick={onMax} className="main-text-brand ml-2">{t("max")}</button>
          </div>
        </div>
      </div>
        <Button className={"mt-4"}>
            {t('withdraw')}
        </Button>
    </div>
  );
};

export default Withdraw;
