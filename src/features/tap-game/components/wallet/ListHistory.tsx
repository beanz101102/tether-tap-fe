import { useTranslation } from "@/app/[lng]/i18n/client";
import { Loading } from "@/components/common/Loading";
import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { getExplorerLink } from "@/utils/getExplorerLink";
import { truncateAddress } from "@/utils/truncateAddress";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import { useWindowSize } from "@/features/tap-game/hooks/useWindowSize";

interface InviteHistory {
  action_time: string;
  amount: string;
  tx_hash: string;
}
const ListHistory = ({ title }: { title?: string }) => {
  const { t } = useTranslation("tap-game", { keyPrefix: "wallet" });
  const { width } = useWindowSize();

  const listData: InviteHistory[] = [
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
    {
      action_time: dayjs().unix()?.toString(),
      amount: "100",
      tx_hash:
        "0x3b26f438305b6d387b11250b4beb0485f7c9fee61bfad890fff72179c25a8139",
    },
  ];

  const isLoading = false;

  return (
    <div className="mt-4 w-full">
      <p className="main-text-primary mb-3 text-lg font-semibold">
        {" "}
        {t(title ?? "history")}{" "}
      </p>

      <div className="main-border-color hide-scrollbar relative h-[38vh] w-full overflow-auto rounded-lg border">
        <div className="header main-bg-secondary text-secondary flex rounded-t-lg text-sm font-normal">
          <div className="main-border-color w-[33%] border-r p-2">
            {t("time")}
          </div>
          <div className="main-border-color w-[33%] border-r p-2 text-center">
            {t("transaction")}
          </div>
          <div className="w-[33%] p-2 text-right">{t("reward")}</div>
        </div>
        <div className="content">
          {isLoading ? (
            <Loading />
          ) : listData?.length > 0 ? (
            listData?.map((data, idx) => {
              return (
                <div
                  key={`history-row-${idx}`}
                  className="main-border-color main-bg-default flex border-b text-sm font-normal"
                >
                  <div className="main-border-color w-[33%] border-r p-2">
                    <p className="main-text-primary text-sm  font-normal md:text-base">
                      {dayjs(Number(data.action_time) * 1000).format(
                        "DD-MM-YYYY",
                      )}
                    </p>
                  </div>
                  <div className="main-border-color flex w-[33%] flex-col items-center justify-center border-r p-2">
                    <a
                      href={getExplorerLink(
                        data?.tx_hash as string,
                        "transaction",
                      )}
                      target="_blank"
                    >
                      <div className="flex items-center">
                        <p className="main-text-primary text-sm  font-normal md:text-base">
                          {truncateAddress(data.tx_hash, width < 375 ? 2 : 4)}
                        </p>
                        <ExternalLink className="main-text-brand ml-1 h-[14px] w-[14px]" />
                      </div>
                    </a>
                  </div>
                  <div className="w-[33%] p-2">
                    <div className="main-text-success flex items-center justify-end text-sm  font-medium md:text-base">
                      + {formatNumberWithCommas(Number(data.amount ?? 0))}
                      <NextImage
                        src="/img/tap-game/coin.webp"
                        alt="coin"
                        className="ml-[6px] h-5 w-5"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="main-text-primary mt-20 flex w-full items-center justify-center">
              <p>{t("nothing_found")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListHistory;
