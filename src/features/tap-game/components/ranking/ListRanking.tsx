"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { useAtom } from "jotai/index";
import { motion } from "framer-motion";
import { useGetCurrentLevel } from "../../hooks/useGetCurrentLevel";
import { ScoreAtom, listRanking } from "@/features/tap-game/constants/tap-game";
import NextImage from "@/components/common/next-image";
import { cn } from "@/utils/cn";
import { formatLargeNumber } from "@/utils/formatNumber";

const ListRanking = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "ranking",
  });
  return (
    <div
      className={
        "hidden-scroll relative flex h-[90vh] flex-col gap-6 overflow-y-auto px-4"
      }
      id={"scrollableDiv"}
    >
      <HeaderRanking />

      <p className={"main-text-secondary mt-8 w-full text-center"}>
        {t("description")}
      </p>
      {/*<div className={'mt-[36px]'}>*/}
      {/*  <ProgressLevel isHiddenHeader />*/}
      {/*</div>*/}

      {/*{isLoading && listRanking?.length === 0 ? (*/}
      {/*  <Loading className={'main-text-primary'} />*/}
      {/*) : listRanking && listRanking?.length > 0 ? (*/}
      {/*  <InfiniteScroll*/}
      {/*    dataLength={listRanking?.length}*/}
      {/*    className={'relative'}*/}
      {/*    style={{ overflow: 'hidden!important' }}*/}
      {/*    next={() => {*/}
      {/*      setPage(page + 1);*/}
      {/*    }}*/}
      {/*    hasMore={true}*/}
      {/*    loader={null}*/}
      {/*    scrollThreshold={0.8}*/}
      {/*    scrollableTarget="scrollableDiv">*/}
      {/*    <div id="scrollableDiv">*/}
      {/*      <div>*/}
      {/*        {listRanking.map((e, idx) => {*/}
      {/*          return (*/}
      {/*            <div key={`item-ranking-${idx}`} className={'mb-2'}>*/}
      {/*              <ItemRanking data={e} />*/}
      {/*            </div>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </InfiniteScroll>*/}
      {/*) : (*/}
      {/*  <EmptyState />*/}
      {/*)}*/}
      {/*<div className={'sticky bottom-8 w-full'}>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',*/}
      {/*    }}>*/}
      {/*    <ItemRanking data={listRanking[0]} className={'border main-border-color main-bg-teritary'} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

const HeaderRanking = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "ranking",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score] = useAtom(ScoreAtom);
  const [direction, setDirection] = useState("next");
  const { currentLevel } = useGetCurrentLevel();

  useEffect(() => {
    setCurrentIndex(currentLevel - 1);
  }, [currentLevel]);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleNext = () => {
    if (currentIndex < listRanking.length - 1) {
      setDirection("next");
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e: any) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (Number(touchStartX.current) - Number(touchEndX.current) > 50) {
      handleNext();
    }

    if (Number(touchStartX.current) - Number(touchEndX.current) < -50) {
      handlePrev();
    }
  };

  const variants = {
    enter: (direction: string) => ({
      x: direction === "next" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === "prev" ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="flex w-full items-center justify-between">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="main-text-secondary cursor-pointer disabled:cursor-no-drop disabled:opacity-50"
      >
        <ArrowLeft />
      </button>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex items-center justify-center space-x-10 pt-12"
      >
        <div className="relative flex h-[280px] w-[280px] items-center justify-center">
          <div
            className="absolute h-[100px] w-[100px] bg-[#FEE888] opacity-50"
            style={{ filter: "blur(40px)" }}
          />
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="relative mt-20 flex flex-col items-center justify-center">
              <div className="relative">
                <NextImage
                  src={`/img/tap-game/rank_${currentIndex + 1}.webp`}
                  alt={listRanking[currentIndex]?.name as string}
                  className={cn(
                    "absolute top-0 mt-[-20px] w-[170px]",
                    "mt-[-60px]",
                  )}
                />
                <div className="mt-24">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="141"
                    height="29"
                    viewBox="0 0 141 29"
                    fill="none"
                  >
                    <ellipse
                      opacity="0.2"
                      cx="70.4998"
                      cy="14.2752"
                      rx="70.1724"
                      ry="14.0345"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="main-text-primary text-center text-2xl font-semibold">
                  {t(listRanking[currentIndex]?.name as string)}
                </h2>
                <p className="main-text-secondary text-center text-base font-medium">
                  {currentLevel === listRanking[currentIndex]?.level
                    ? t("progress_level", {
                        amount: formatLargeNumber(Number(score)),
                        amountLevel: formatLargeNumber(
                          listRanking[currentIndex]?.max as number,
                        ),
                      })
                    : t("form_level", {
                        amount: formatLargeNumber(
                          listRanking[currentIndex]?.min as number,
                        ),
                      })}{" "}
                  {listRanking[currentIndex]?.isMaxLevel && "+"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={currentIndex === listRanking.length - 1}
        className="main-text-secondary cursor-pointer disabled:cursor-no-drop disabled:opacity-50"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default ListRanking;
