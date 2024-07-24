/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetCurrentLevel } from "@/features/tap-game/hooks/useGetCurrentLevel";
import { listRanking } from "@/features/tap-game/constants/tap-game";
import { ListRankingProps } from "@/features/tap-game/interfaces/tap-game";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProgressLevel = ({ isHiddenHeader }: { isHiddenHeader?: boolean }) => {
  const { t } = useTranslation("tap-game");
  const { t: tRanking } = useTranslation("tap-game", {
    keyPrefix: "ranking",
  });
  const router = useRouter();
  const { currentLevel, progress } = useGetCurrentLevel();
  const currentLevelDetail = listRanking?.find(
    (item) => item.level === currentLevel,
  ) as ListRankingProps;

  return (
    <div>
      {!isHiddenHeader && (
        <div className={"mb-2 flex items-center justify-between"}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <Link
            href={"/ranking"}
            prefetch
            className={
              "main-text-primary flex cursor-pointer items-center gap-1 text-xs font-medium"
            }
            onClick={() => router.push("ranking")}
          >
            <span>{tRanking(currentLevelDetail?.name || "novice")}</span>
            <ChevronRight className={"main-text-primary h-3 w-3"} />
          </Link>
          <p className={"main-text-secondary text-xs font-medium"}>
            {t("level")}: {currentLevel}/10
          </p>
        </div>
      )}

      <div
        className={
          "bg-main-border-secondary main-bg-muted h-[11px] w-full overflow-hidden rounded-full"
        }
      >
        <div
          className={"bg-main-text-primary h-[11px] rounded-full"}
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #29E03B 0%, #B5EFA1 61.44%, #5E7834 104.87%, #FE90AF 144.32%)",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressLevel;
