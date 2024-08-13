"use client";
import NextImage from "@/components/common/next-image";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useTranslation } from "react-i18next";
import {atom, useAtom} from "jotai/index";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ListHistory from "./ListHistory";
import SelectChain from "./SelectChain";
import Link from "next/link";
import { getExplorerLink } from "@/utils/getExplorerLink";
import {useEffect, useState} from "react";
import {api} from "@/trpc/react";
import {uniqBy} from "lodash";
import {ITransferTransactionHistory} from "@/features/tap-game/interfaces/transaction-history";


const listTransactionHistoryAtom = atom<ITransferTransactionHistory[]>([]);


const Wallet = () => {
  const [chainId, setChainId] = useState<number>(0);
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });
  const { currentUser } = useGetCurrentUser();
  const [score] = useAtom(ScoreAtom);
  const [page, setPage] = useState(1);
  const [listTransactionHistory, setListTransactionHistory] = useAtom(listTransactionHistoryAtom);
  const { data, isLoading } = api.tapGame.getListTransactionHistory.useQuery({
    address: currentUser?.address as string,
    pageSize: 20,
    page: page,
    status: "all",
  });

  useEffect(() => {
    if (!data || isLoading) return;
    if (page === 1) {
      setListTransactionHistory(uniqBy(data?.listTransactionHistory as any[], 'txHash'));
    } else {
      setListTransactionHistory(
        uniqBy([...listTransactionHistory, ...(data?.listTransactionHistory as any)], 'txHash'),
      );
    }
  }, [data, page, isLoading]);



  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
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
              "main-text-secondary text:sm xs:text-base pl-1 font-medium"
            }
          >
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
          className={"h-[30px] w-[30px]"}
          src={"/img/tap-game/coin.webp"}
          alt={"coin"}
        />
        <p className={"main-text-primary pl-2 text-3xl font-semibold"}>
          {formatNumberWithCommas(Number(score))}
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
      <Link
        className={"mt-3"}
        target={"_blank"}
        href={getExplorerLink(currentUser?.address ?? "", "address")}
      >
        <div className="flex items-center">
          <ExternalLink className="main-text-brand mr-1 h-4 w-4" />
          <p className="main-text-brand">{t("view_explorer")}</p>
        </div>
      </Link>
      <div className={"w-full px-4"}>
        <ListHistory
          listData={listTransactionHistory}
          hasMore={page === data?.totalPages}
          isLoading={isLoading}
          nextPage={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
};

export default Wallet;
