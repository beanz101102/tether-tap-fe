import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { useTranslation } from "@/app/[lng]/i18n/client";

const StatsReferral = () => {
    return (
        <div className="flex justify-between w-full items-stretch">
            <div className="w-[49%]">
                <ItemStatsReferral title={'normal_title'} value={0.000001} />
            </div>
            <div className="w-[49%]">
                <ItemStatsReferral title={'premium_title'} value={0.000001} />
            </div>
        </div>
    );
}

const ItemStatsReferral = ({ title, value }: { title: string, value: number }) => {
    const { t } = useTranslation("tap-game", {
        'keyPrefix': 'friends'
    })
    return (
        <div className="border border-[#45887A] h-full py-2 px-3 rounded-lg flex flex-col justify-between">
            <p className="text-sm font-normal main-text-secondary">
                {t(`rewards.${title}`)}
            </p>
            <div className="flex items-center mt-1">
                <NextImage className="w-6 h-6" width={24} h={24} src={'/img/tap-game/coin.webp'} alt={'usdt'} />
                <p className="main-text-warning pl-1 text-base font-bold">
                    + {formatNumberWithCommas(value)}
                </p>
            </div>
        </div>
    )
}

export default StatsReferral;
