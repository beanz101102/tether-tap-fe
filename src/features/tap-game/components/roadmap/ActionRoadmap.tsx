import { useTranslation } from 'react-i18next';
import {useRouter} from "next/navigation";
import Image from "next/image";

const ActionRoadmap = () => {
  const { t } = useTranslation('tap-game', {
    keyPrefix: 'roadmap',
  });
  const router = useRouter();
  return (
    <button onClick={() => router.push('roadmap')} className={'rounded-[32px] main-bg-slate-op px-1.5 py-2 mb-6'}>
      <div className={'flex items-center'}>
        <Image width={32} height={32} className={'w-8 h-8'} src={'/img/tap-game/handball.png'} alt={'handball'} />
        <p className={'main-text-primary text-sm font-semibold'}>{t('title')}</p>
      </div>
    </button>
  );
};

export default ActionRoadmap;
