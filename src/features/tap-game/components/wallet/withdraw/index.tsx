"use client";
import NextImage from "@/components/common/next-image";
import {formatNumberWithCommas} from "@/utils/formatNumber";
import {Button} from "@/components/ui/button";
import SelectChain, {ChainIdAtom} from "../SelectChain";
import {useTranslation} from "@/app/[lng]/i18n/client";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";
import {useWithdraw} from "@/features/tap-game/hooks/useWithdraw";
import {useAtom, useAtomValue} from "jotai/index";
import {ScoreAtom} from "@/features/tap-game/constants/tap-game";
import NumberInput from "@/components/ui/NumberInput";

const Withdraw = () => {
  const [score] = useAtom(ScoreAtom);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const {handleWithdraw, loading} = useWithdraw(() => {
    setAddress("");
    setAmount("");
  });
  const chainId = useAtomValue(ChainIdAtom);

  const minWithdraw = 0.5;
  const balance = score;
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });
  const { t: tValidate } = useTranslation("tap-game", {
    keyPrefix: "upgrade",
  });

  const onMax = () => {
      setAmount(String(balance))
  }
  const onWithdraw = useCallback(() => {
    handleWithdraw({amount: Number(amount), receiver: address, chain_id: chainId});
  }, [amount, address, chainId]);

  const isAddressValid = useMemo(() => {
    const addressETHRegex = /^0x[0-9a-fA-F]{40}$/;
    return addressETHRegex.test(address);
  }, [address]);

  const isShowErrorAmountInput = useMemo(() => {
    return Number(amount) > Number(balance ?? 0) || Number(amount) < minWithdraw
  }, [amount, balance])


  const isDisableButtonWithdraw = useMemo(() => {
    return isShowErrorAmountInput ||  !isAddressValid || address?.trim() === '' || amount?.trim() === ''
  },[isShowErrorAmountInput, isAddressValid, address, amount])

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
          error={!isAddressValid && address?.trim() !== '' ? t("invalid_address") : ""}
          value={address}
          className="main-border-color w-full main-text-primary border"
          placeholder={t("enter_address_wallet")}
        />
      </div>
      <div className="main-bg-default main-text-secondary font-normal main-border-color mt-5 w-full rounded-lg border px-2 py-3 text-sm">
        <p className="main-text-secondary text-sm font-normal">{t("amount")}</p>
        <div className="flex items-center justify-between">
          <NumberInput
            onValueChange={(e) => {
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
            <p>{t("balance")}: {formatNumberWithCommas(Number(balance))}</p>
            <button onClick={onMax} className="main-text-brand ml-2">{t("max")}</button>
          </div>
        </div>
      </div>
     <div className={"w-full"}>
       {
         amount?.trim() !== '' && isShowErrorAmountInput &&
           <p className="main-text-danger text-left text-sm font-normal mt-[2px]">
             {Number(amount) > Number(balance ?? 0) ? tValidate('err_balance') : Number(amount) < minWithdraw ? tValidate('min_amount_withdraw', {
               amount: minWithdraw,
             }) : ''}
           </p>
       }
     </div>
      <Button
        loading={loading}
        disabled={isDisableButtonWithdraw}
        variant={'common'}
        onClick={onWithdraw}
        className={"mt-8 w-full"}
      >
        {t('transfer')}
        </Button>
    </div>
  );
};

export default Withdraw;
