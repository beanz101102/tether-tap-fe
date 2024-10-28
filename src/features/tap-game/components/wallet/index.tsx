"use client";
import NextImage from "@/components/common/next-image";
import { Button } from "@/components/ui/button";
import { useGetCurrentBalance } from "@/features/tap-game/hooks/useGetCurrentBalance";
import { ITransferTransactionHistory } from "@/features/tap-game/interfaces/transaction-history";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { api } from "@/trpc/react";
import { getExplorerLink } from "@/utils/getExplorerLink";
import { atom, useAtom, useAtomValue } from "jotai/index";
import { uniqBy } from "lodash";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ListHistory from "./ListHistory";
import SelectChain, { ChainIdAtom } from "./SelectChain";
import AnimatedNumber from "@/components/ui/animated-number";
import { ShieldCheck, Info } from "lucide-react";

const listTransactionHistoryAtom = atom<ITransferTransactionHistory[]>([]);

const Wallet = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });
  const currentChainId = useAtomValue(ChainIdAtom);
  const { currentUser } = useGetCurrentUser();
  const score = useGetCurrentBalance();

  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      {/* Header with user info */}
      <div
        className={
          "main-border-color flex w-full items-center justify-between border-b px-4 py-4"
        }
      >
        <div className={"flex items-center"}>
          <NextImage
            className={"h-10 w-10 rounded-full"}
            src={currentUser?.avatar as string}
            alt={currentUser?.name as string}
          />
          <p
            className={
              "main-text-secondary text:sm xs:text-base max-w-[160px] truncate pl-1 font-medium"
            }
          >
            {currentUser?.name}
          </p>
        </div>
        {/* Network Badge - Replace SelectChain */}
        <div className="flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5">
          <NextImage
            src="/images/bnb-chain-logo.png"
            alt="BNB Chain"
            className="h-5 w-5"
          />
          <span className="font-medium text-yellow-800">BNB Chain</span>
        </div>
      </div>

      {/* Balance Section */}
      <div className="w-full px-4 py-6">
        <p className={"main-text-secondary text-center text-sm font-medium"}>
          Available Balance
        </p>
        <div className={"mt-2 flex items-center justify-center"}>
          <NextImage
            className={"h-[30px] w-[30px]"}
            src={"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"}
            alt={"USDT"}
          />
          <p className={"main-text-primary pl-2 text-3xl font-semibold"}>
            <AnimatedNumber
              value={Number(Number(score ?? 0).toFixed(7))}
              hasComma={true}
              size={30}
              duration={200}
            />
          </p>
        </div>

        {/* Description */}
        <p className="main-text-secondary mx-auto mt-3 max-w-[500px] text-center text-sm">
          Your balance is secured by smart contracts on BNB Chain. Deposit USDT
          to start playing and withdraw anytime with minimal fees.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full px-4">
        <div className="flex justify-center gap-3">
          <Link href={"/wallet/withdraw"} className="max-w-[180px] flex-1">
            <Button className="w-full rounded-full" variant={"outline"}>
              Withdraw
            </Button>
          </Link>
          <Link href={"/wallet/deposit"} className="max-w-[180px] flex-1">
            <Button className="w-full rounded-full" variant={"common"}>
              Deposit
            </Button>
          </Link>
        </div>

        {/* Explorer Link */}
        <Link
          className={"mt-4 flex justify-center"}
          target={"_blank"}
          href={getExplorerLink(
            currentUser?.address ?? "",
            "address",
            56, // Hardcode BNB Chain ID
          )}
        >
          <div className="flex items-center hover:opacity-80">
            <ExternalLink className="main-text-brand mr-1 h-4 w-4" />
            <p className="main-text-brand">View on BscScan</p>
          </div>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="mt-8 w-full space-y-4 px-4">
        {/* Security Info */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-blue-800">
            <ShieldCheck className="h-5 w-5" />
            Secure & Reliable
          </h3>
          <p className="text-sm text-blue-700">
            Your funds are protected by smart contracts on BNB Chain. All
            transactions are transparent and verifiable.
          </p>
        </div>

        {/* Fee Info */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-800">
            <Info className="h-5 w-5" />
            Transaction Fees
          </h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Deposits: No fee</li>
            <li>• Withdrawals: 0.5 USDT network fee</li>
            <li>• Minimum withdrawal: 0.5 USDT</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Remove ListTransactionHistory component as it's no longer needed

export default Wallet;
