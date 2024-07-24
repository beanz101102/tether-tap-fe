"use client";
import {Loading} from "@/components/common/Loading";
import {useEffect, useState} from "react";
import LoadingBar from 'react-top-loading-bar';
import Image from "next/image";

const ConnectingApp = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 90) {
          return prevProgress + 10; // Fast increment initially
        } else if (prevProgress >= 90 && prevProgress < 95) {
          return prevProgress + 5; // Slower increment as it approaches 100%
        }
        return prevProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'w-full h-[100vh] flex items-center justify-center relative'}>
      <Image
        src={'/img/connection_app_bg.jpg'}
        alt={'loading bg'}
        layout={'fill'}
        objectFit={'cover'}
        quality={100}
      />
      <LoadingBar
        style={{
          background: 'linear-gradient(90deg, green 0%, #FFFFC7 144.32%)',
        }}
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />
      <Loading className={'main-text-primary'} />
    </div>
  )
}

export default ConnectingApp