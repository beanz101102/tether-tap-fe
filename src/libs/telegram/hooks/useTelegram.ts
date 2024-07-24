import { useEffect, useMemo, useState } from "react";

export const useTelegram = () => {
  const [isTelegram, setIsTelegram] = useState(
    !!window?.Telegram?.WebApp?.initData,
  );

  const checkForTelegram = () => {
    if (window?.Telegram?.WebApp?.initData) {
      setIsTelegram(true);
    } else {
      // This is to ensure that the Telegram object is available
      const timeout = setTimeout(() => {
        checkForTelegram();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  };

  useEffect(() => {
    if (isTelegram) return;
    return checkForTelegram();
  }, [isTelegram]);

  return isTelegram;
};
