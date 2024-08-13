"use client";
import {useGetCurrentUser} from "@/libs/hooks/useGetCurrentUser";
import {useAtom} from "jotai/index";
import {Button} from "@/components/ui/button";
import SelectChain from "../SelectChain";
import ListHistory from "../ListHistory";
import {useTranslation} from "@/app/[lng]/i18n/client";
import {truncateAddress} from "@/utils/truncateAddress";
import {useWindowSize} from "@/features/tap-game/hooks/useWindowSize";
import {copyToClipboardWithCommand} from "@/utils/copyToClipboardWithCommand";
import {useEffect, useState} from "react";
import {api} from "@/trpc/react";
import {uniqBy} from "lodash";
import {atom} from "jotai";
import {ITransferTransactionHistory} from "@/features/tap-game/interfaces/transaction-history";

const listDepositTransactionHistoryAtom = atom<ITransferTransactionHistory[]>([]);


const Deposit = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "wallet",
  });
  const { currentUser } = useGetCurrentUser();
  const { width } = useWindowSize();
  const address = currentUser?.address;


  return (
    <div className={"flex w-full flex-col items-center justify-center px-4"}>
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
          <div className="main-bg-default main-text-primary main-border-color w-[65%] rounded-md border px-3 py-2 text-base font-normal">
            {truncateAddress(address, width < 780 ? 6 : 10)}
          </div>
          <Button
            onClick={() => copyToClipboardWithCommand(address ?? "")}
            variant={"common"}
            className="!w-[30%]"
          >
            {t("copy")}
          </Button>
        </div>
      </div>
      <ListTransactionHistory/>
    </div>
  );
};

const ListTransactionHistory = () => {
  const { currentUser } = useGetCurrentUser();

  const [page, setPage] = useState(1);
  const [listDepositTransactionHistory, setListDepositTransactionHistory] = useAtom(listDepositTransactionHistoryAtom);
  const { data, isLoading } = api.tapGame.getListTransactionHistory.useQuery({
    address: currentUser?.address as string,
    pageSize: 20,
    page: page,
    status : 'deposit'
  }, {
    refetchInterval: 10000
  });

  useEffect(() => {
    if (!data || isLoading) return;
    if (page === 1) {
      setListDepositTransactionHistory(uniqBy(data?.listTransactionHistory as any[], 'txHash'));
    } else {
      setListDepositTransactionHistory(
        uniqBy([...listDepositTransactionHistory, ...(data?.listTransactionHistory as any)], 'txHash'),
      );
    }
  }, [data, page, isLoading]);

  return (
    <ListHistory
      listData={listDepositTransactionHistory}
      hasMore={page === data?.totalPages}
      isLoading={isLoading}
      nextPage={() => setPage(page + 1)}
      title="deposit_history" />
  )
}

export default Deposit;
