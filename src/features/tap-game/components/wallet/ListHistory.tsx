import { useTranslation } from "@/app/[lng]/i18n/client";
import { Loading } from "@/components/common/Loading";
import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { getExplorerLink } from "@/utils/getExplorerLink";
import { truncateAddress } from "@/utils/truncateAddress";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import { useWindowSize } from "@/features/tap-game/hooks/useWindowSize";
import {ITransferTransactionHistory} from "@/features/tap-game/interfaces/transaction-history";
import InfiniteScroll from 'react-infinite-scroll-component';


const ListHistory = ({ title , listData, nextPage, isLoading, hasMore}: { title?: string, listData: ITransferTransactionHistory[], isLoading: boolean, nextPage: () => void, hasMore: boolean }) => {
  const { t } = useTranslation("tap-game", { keyPrefix: "wallet" });
  const { width } = useWindowSize();

  return (
    <div className="mt-4 w-full">
      <p className="main-text-primary mb-3 text-lg font-semibold">
        {" "}
        {t(title ?? "history")}{" "}
      </p>

      <div
        id={'scrollableDiv'}
        className="main-border-color hide-scrollbar relative h-[38vh] w-full overflow-auto rounded-lg border">
        <div className={'w-[480px]'}>
          <div className="header main-bg-secondary text-secondary flex rounded-t-lg text-sm font-normal">
            <div className="main-border-color w-[33%] border-r p-2">
              {t("time")}
            </div>
            <div className="main-border-color w-[33%] border-r p-2 text-center">
              {t("transaction")}
            </div>
            <div className="w-[33%] p-2 main-border-color border-r text-right">{t("amount")}</div>
            <div className="w-[25%] p-2 text-right">{t("status")}</div>
          </div>
          <div className="content">
            {isLoading ? (
              <Loading/>
            ) : listData?.length > 0 ? (
              <InfiniteScroll
                dataLength={listData?.length}
                className={'relative'}
                style={{overflow: 'hidden!important'}}
                next={() => {
                  nextPage();
                }}
                hasMore={hasMore}
                loader={null}
                scrollThreshold={0.5}
                scrollableTarget="scrollableDiv">
                {
                  listData?.map((data, idx) => {
                    const colorByStatus =
                      data?.status == 'success'
                        ? 'rgb(16 185 129)'
                        : data?.status === 'failed'
                          ? 'rgb(244 63 94)'
                          : 'rgb(124 58 237)';

                    const isDeposit = data?.type === 'deposit'
                    return (
                      <div
                        key={`history-row-${idx}`}
                        className="main-border-color main-bg-default flex border-b text-sm font-normal"
                      >
                        <div className="main-border-color w-[33%] border-r p-2">
                          <p className="main-text-primary text-sm  font-normal md:text-base">
                            {dayjs(dayjs(data.createdAt).unix() * 1000).format(
                              "DD-MM-YYYY",
                            )}
                          </p>
                        </div>
                        <div
                          className="main-border-color flex w-[33%] flex-col items-center justify-center border-r p-2">
                          {
                            data?.status === 'failed' || data?.status === 'pending' ? <p style={{color: colorByStatus}}>
                              {t(data?.type)}
                              </p> :
                              <a
                                href={getExplorerLink(
                                  data?.txHash as string,
                                  "transaction",
                                  data?.token?.chainId as number,
                                )}
                                target="_blank"
                              >
                                <div className="flex items-center">
                                  <p className="main-text-primary text-sm  font-normal md:text-base">
                                    {truncateAddress(data.txHash, width < 375 ? 2 : 4)}
                                  </p>
                                  <ExternalLink className="main-text-brand ml-1 h-[14px] w-[14px]"/>
                                </div>
                              </a>
                          }
                        </div>
                        <div className="w-[33%] main-border-color border-r p-2">
                          <div
                            style={{
                              color:  isDeposit ? 'rgb(16 185 129)' : 'rgb(244 63 94)'
                            }}
                            className="main-text-success flex items-center justify-end text-sm  font-medium md:text-base">
                            {isDeposit ? '+' : '-'} {formatNumberWithCommas(Number(data.value ?? 0))}
                            <NextImage
                              src="/img/tap-game/coin.webp"
                              alt="coin"
                              className="ml-[6px] h-5 w-5"
                            />
                          </div>
                        </div>
                        <div className="w-[25%] p-2">
                        <p
                            style={{
                              color: colorByStatus
                            }}
                            className="flex items-center justify-end text-sm  font-medium md:text-base">
                            {t(data?.status)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </InfiniteScroll>
            ) : (
              <div className="main-text-primary mt-20 flex w-full items-center justify-center">
                <p>{t("nothing_found")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHistory;
