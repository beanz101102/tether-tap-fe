"use client";
import NextImage from "@/components/common/next-image";
import {
  formatNumberWithCommas,
  formatNumberWithNumeral,
} from "@/utils/formatNumber";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useWithdraw } from "@/features/tap-game/hooks/useWithdraw";
import { useAtom, useAtomValue } from "jotai/index";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import NumberInput from "@/components/ui/NumberInput";
import ShadModal from "@/components/ui/ShadModal";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useModal } from "@/libs/hooks/useModal";
import { truncateAddress } from "@/utils/truncateAddress";
import { useGetCurrentBalance } from "@/features/tap-game/hooks/useGetCurrentBalance";

const Withdraw = () => {
  const [score] = useAtom(ScoreAtom);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const {
    open: isOpenModalConfirm,
    setOpen: setOpenModalConfirm,
    openModal: openModalConfirm,
  } = useModal();
  const { handleWithdraw, loading } = useWithdraw(() => {
    setAddress("");
    setAmount("");
    setOpenModalConfirm(false);
  });

  const minWithdraw = 0.5;
  const balance = score;

  const onMax = () => {
    setAmount(String(balance));
  };
  const onWithdraw = useCallback(() => {
    handleWithdraw({
      amount: Number(amount),
      receiver: address,
      chain_id: 56, // Hardcode BNB Chain ID
    });
  }, [amount, address]);

  const isAddressValid = useMemo(() => {
    const addressETHRegex = /^0x[0-9a-fA-F]{40}$/;
    return addressETHRegex.test(address);
  }, [address]);

  const isShowErrorAmountInput = useMemo(() => {
    return (
      Number(amount) > Number(balance ?? 0) || Number(amount) < minWithdraw
    );
  }, [amount, balance]);

  const isDisableButtonWithdraw = useMemo(() => {
    return (
      isShowErrorAmountInput ||
      !isAddressValid ||
      address?.trim() === "" ||
      amount?.trim() === ""
    );
  }, [isShowErrorAmountInput, isAddressValid, address, amount]);

  return (
    <div className={"flex w-full flex-col items-center justify-center px-4"}>
      <p className="main-text-primary pt-6 text-center text-4xl font-semibold">
        Withdraw
      </p>
      <p className="main-text-secondary mt-2 max-w-[500px] text-center text-sm font-normal">
        Withdraw your USDT to any wallet address. All withdrawals are processed
        on BNB Chain (BSC) with minimal fees.
      </p>

      {/* Network Info */}
      <div className="mt-6 w-full rounded-lg border border-blue-100 bg-blue-50 p-3">
        <div className="flex items-center gap-2">
          <NextImage
            src="/images/bnb-chain-logo.png"
            alt="BNB Chain"
            className="h-5 w-5"
          />
          <span className="font-medium text-blue-800">BNB Chain (BSC)</span>
        </div>
      </div>

      {/* Wallet Address Input */}
      <div className="mt-4 w-full">
        <p className="main-text-primary mb-2 text-sm font-medium">
          Recipient Address
        </p>
        <Input
          onChange={(e) => {
            setAddress(e?.target?.value);
          }}
          error={
            !isAddressValid && address?.trim() !== ""
              ? "Invalid BNB Chain address"
              : ""
          }
          value={address}
          className="main-border-color main-text-primary w-full border !bg-gray-50"
          placeholder="Enter BNB Chain (BSC) address"
        />
      </div>

      {/* Amount Input */}
      <div>
        <p className="main-text-primary mt-4 text-sm font-medium">Amount</p>
        <div className="mt-1 w-full rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <NumberInput
              onValueChange={(e) => {
                setAmount(e?.target?.value);
              }}
              value={amount}
              placeholder="0.0"
              className="main-text-primary w-[60%] border-none !bg-gray-50  !pl-0 text-[20px]"
            />
            <div className="flex items-center">
              <NextImage
                className="mr-2 h-5 w-5"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                alt="usdt logo"
              />
              <span className="font-medium">USDT</span>
            </div>
          </div>
        </div>
      </div>
      {/* Error Messages */}
      <div className={"w-full"}>
        {amount?.trim() !== "" && isShowErrorAmountInput && (
          <p className="main-text-danger mt-2 text-left text-sm">
            {Number(amount) > Number(balance ?? 0)
              ? "Insufficient balance"
              : Number(amount) < minWithdraw
                ? `Minimum withdrawal amount is ${minWithdraw} USDT`
                : ""}
          </p>
        )}
      </div>

      <div className="mt-2 flex w-full items-center justify-between">
        <p className="main-text-muted text-sm">
          Min: {formatNumberWithCommas(minWithdraw)} USDT
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span>Balance: {formatNumberWithNumeral(Number(balance), 7)}</span>
          <button onClick={onMax} className="main-text-brand font-medium">
            MAX
          </button>
        </div>
      </div>

      {/* Fee Info */}
      <div className="mt-4 w-full rounded-lg border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Network Fee</span>
          <span className="font-medium">0.5 USDT</span>
        </div>
      </div>

      {/* Withdraw Button */}
      <Button
        loading={loading}
        disabled={isDisableButtonWithdraw}
        variant={"common"}
        onClick={openModalConfirm}
        className={"mt-6 w-full"}
      >
        Withdraw
      </Button>

      <ModalConfirm
        toAddress={address}
        isOpen={isOpenModalConfirm}
        setOpen={setOpenModalConfirm}
        onConfirm={onWithdraw}
        amount={Number(amount ?? 0)}
        isLoadingConfirm={loading}
      />
    </div>
  );
};

export default Withdraw;

interface ModalConfirmProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  toAddress: string;
  amount: number;
  isLoadingConfirm: boolean;
}

const ModalConfirm = ({
  isOpen,
  onConfirm,
  setOpen,
  toAddress,
  amount,
  isLoadingConfirm,
}: ModalConfirmProps) => {
  const { t } = useTranslation("wallet");
  const { t: tUpgrade } = useTranslation("tap-game", {
    keyPrefix: "upgrade",
  });

  const currentBalance = useGetCurrentBalance();
  const feeWithdraw = 0.5;

  return (
    <ShadModal isOpen={isOpen} onOpen={setOpen}>
      <div className={"w-full"}>
        <p className={"main-text-primary pb-3 pt-3 text-lg font-semibold"}>
          {t("withdraw")}
        </p>
        <p className="mb-1 text-right text-sm font-normal">
          {t("avail")}:{" "}
          <span className="font-medium">
            {Number(currentBalance) > 0
              ? formatNumberWithNumeral(Number(currentBalance), 7)
              : 0}{" "}
            USDT
          </span>
        </p>
        <div className={"main-border-color rounded-lg border p-3"}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="!p-0">
              <AccordionTrigger className="!p-0">
                <div className="flex w-full items-center justify-between">
                  <p className="main-text-read !text-sm !font-normal">
                    {t("transaction_value")}
                  </p>
                  <p className="main-text-primary pr-1 !text-sm !font-medium">
                    {formatNumberWithCommas(amount)} USDT
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="!border-none !pb-0 !pt-2">
                <div
                  className={
                    "main-bg-teritary main-text-read rounded-lg px-4 py-2 text-sm font-normal"
                  }
                >
                  <div className={"flex w-full items-center justify-between"}>
                    <p>{t("to")}</p>
                    <p className={"main-text-primary font-medium"}>
                      {truncateAddress(toAddress)}
                    </p>
                  </div>
                  <div
                    className={"mt-2 flex w-full items-center justify-between"}
                  >
                    <p>{t("amount")}</p>
                    <p className={"main-text-primary font-medium"}>
                      {formatNumberWithCommas(amount)}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div
            className={
              "main-border-color mt-2 flex w-full items-center justify-between border-t pt-2"
            }
          >
            <p className={"main-text-read text-sm font-normal"}>
              {t("transaction_fees")}
            </p>
            <div className="main-text-primary flex items-center !text-sm font-medium">
              {feeWithdraw} USDT
            </div>
          </div>
        </div>
        {/* {isShowErr && (
          <p className="main-text-danger mt-1 text-sm font-normal">
            {tUpgrade("err_balance")}
          </p>
        )} */}
        <div className={"mt-4 flex w-full items-center justify-between"}>
          <p className={"main-text-read text-sm font-normal"}>
            {t("total_received")}
          </p>
          <div className="main-text-primary flex items-center text-base font-semibold">
            <NextImage
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
              alt="coin"
              className="mr-2 h-5 w-5"
            />
            {formatNumberWithCommas(Number(amount) - feeWithdraw)} USDT
          </div>
        </div>
        <Button
          variant={"common"}
          className={"mt-6 !h-10 w-full"}
          onClick={onConfirm}
          // disabled={isShowErr}
          loading={isLoadingConfirm}
        >
          {t("confirm")}
        </Button>
      </div>
    </ShadModal>
  );
};
