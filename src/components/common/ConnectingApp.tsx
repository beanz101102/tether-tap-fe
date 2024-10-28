"use client";
import { Loading } from "@/components/common/Loading";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import NextImage from "./next-image";
import { cn } from "@/utils/cn";

const ConnectingApp = () => {
  const [progress, setProgress] = useState(0);

  const listSocial = [
    {
      title: "telegram",
      url: "https://t.me/tethercoin",
    },
    {
      title: "twitter",
      url: "https://twitter.com/tethercoin",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 10;
        } else if (prevProgress >= 90 && prevProgress < 95) {
          return prevProgress + 5;
        }
        return prevProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={
        "relative flex h-[100vh] w-full flex-col items-center bg-white"
      }
    >
      <LoadingBar
        style={{
          background: "linear-gradient(90deg, green 0%, #FFFFC7 144.32%)",
        }}
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />

      <div className="z-10 mt-[60px] flex-col text-center">
        <p className="text-[48px] font-extrabold text-gray-900">Whack & Earn</p>
        <p className="mt-2 text-xl text-gray-600">Hit moles, earn USDT</p>
      </div>

      <div className="z-10 mt-6 max-w-md px-4 text-center">
        <div className="mt-2 space-y-2 text-gray-600">
          <p>✓ Free to play</p>
          <p>✓ Daily rewards</p>
          <p>✓ Instant withdraw</p>
        </div>
      </div>

      <div className="z-10 flex flex-grow items-center justify-center">
        <Loading className={"text-gray-900"} />
      </div>

      <div className="z-10 mb-8 mt-auto flex flex-col text-center">
        <p className="text-gray-600">Loading game...</p>

        <div className="mx-auto mt-4 flex w-fit">
          {listSocial?.map((e, idx) => {
            return (
              <div
                className={cn(
                  "flex h-8 w-8 flex-col items-center justify-center rounded-full bg-gray-100",
                  idx != listSocial?.length - 1 && "mr-4",
                )}
                key={`item_social_${idx}`}
              >
                <NextImage
                  className="h-4 w-4"
                  src={`/img/tap-game/${e?.title}.svg`}
                  alt={e?.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectingApp;
