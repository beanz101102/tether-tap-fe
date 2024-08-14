import {Button} from "@/components/ui/button";
import {formatNumberWithCommas} from "@/utils/formatNumber";
import {Dispatch, FC, memo, SetStateAction, useEffect} from "react";
import ShadModal from "@/components/ui/ShadModal";
import Image from "next/image";
import {useAtom} from "jotai";
import {coinGainedWhileOfflineAtom} from "@/app/[lng]/(auth)/layout";

interface ModalTotalEarnedWhileOfflineProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  profit: number;
}

const ModalTotalEarnedWhileOffline: FC<ModalTotalEarnedWhileOfflineProps> = ({ isOpen, setOpen, profit }) => {
  return (
    <ShadModal isOpen={isOpen} onOpen={setOpen}>
      <CleanUpComponent />
      <div className={'px-3 pt-3 pb-6'}>
        <p className={'text-lg font-bold text-center main-text-primary w-full '}>Total USDT earned</p>
        <div className={'w-[64px] h-[64px] mx-auto mt-6 mb-3'}>
          <Image src={'/img/tap-game/coin.svg'} width={64} height={63} alt={'coin'} className={'w-full h-full'} />
        </div>
        <p className={'main-text-primary text-xl font-semibold w-full text-center mb-3'}>
          +{formatNumberWithCommas(profit)}
        </p>
        <p className={'main-text-secondary text-sm font-normal mb-6 w-full text-center'}>The economy has been extremely active while you were offline. Check back regularly to collect your coins.</p>
        <Button
          className={'rounded-2xl w-full'}
          onClick={() => {
            setOpen(false);
          }}>
          Collect
        </Button>
      </div>
    </ShadModal>
  );
}

const CleanUpComponent = memo(() => {
  const [_, setCoinGainedWhileOffline] = useAtom(coinGainedWhileOfflineAtom);
  useEffect(() => {
    return () => {
      setCoinGainedWhileOffline(prev => {
        return {
          profit: 0,
          isShowUp: true,
        };
      });
    };
  }, []);
  return <></>;
});

export default ModalTotalEarnedWhileOffline