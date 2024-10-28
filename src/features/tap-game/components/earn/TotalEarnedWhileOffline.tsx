import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import ShadModal from "@/components/ui/ShadModal";
import Image from "next/image";
import { useAtom } from "jotai";
import { coinGainedWhileOfflineAtom } from "@/app/[lng]/(auth)/layout";
import { useTranslation } from "@/app/[lng]/i18n/client";

interface ModalTotalEarnedWhileOfflineProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  profit: number;
}

const ModalTotalEarnedWhileOffline: FC<ModalTotalEarnedWhileOfflineProps> = ({
  isOpen,
  setOpen,
  profit,
}) => {
  const { t } = useTranslation("mine");
  return (
    <ShadModal isOpen={isOpen} onOpen={setOpen}>
      <CleanUpComponent />
      <div className={"px-3 pb-6 pt-3"}>
        <p
          className={"main-text-primary w-full text-center text-lg font-bold "}
        >
          {t("mine_offline_title")}
        </p>
        <div className={"mx-auto mb-3 mt-6 h-[64px] w-[64px]"}>
          <Image
            src={"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"}
            width={64}
            height={63}
            alt={"coin"}
            className={"h-full w-full"}
          />
        </div>
        <p
          className={
            "main-text-primary mb-3 w-full text-center text-xl font-semibold"
          }
        >
          +{formatNumberWithCommas(profit)}
        </p>
        <p
          className={
            "main-text-secondary mb-6 w-full text-center text-sm font-normal"
          }
        >
          {t("mine_offline_des")}
        </p>
        <Button
          className={"w-full rounded-2xl"}
          onClick={() => {
            setOpen(false);
          }}
        >
          Collect
        </Button>
      </div>
    </ShadModal>
  );
};

const CleanUpComponent = memo(() => {
  const [_, setCoinGainedWhileOffline] = useAtom(coinGainedWhileOfflineAtom);
  useEffect(() => {
    return () => {
      setCoinGainedWhileOffline((prev) => {
        return {
          profit: 0,
          isShowUp: true,
        };
      });
    };
  }, []);
  return <></>;
});

export default ModalTotalEarnedWhileOffline;
