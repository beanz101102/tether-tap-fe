"use client";
import { initBackButton, useInitData } from "@tma.js/sdk-react";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActivePage } from "../hooks/useActivePage";
import { useTelegram } from "./hooks/useTelegram";

export function ProviderTelegram({ children }: { children: React.ReactNode }) {
  const WebApp = window?.Telegram?.WebApp;
  const initData = useInitData();
  const isTelegram = useTelegram();
  useEffect(() => {
    const { allowsWriteToPm: allows_write_to_pm } = initData?.user || {};
    if (!allows_write_to_pm && isTelegram) {
      WebApp?.requestWriteAccess();
    }

    const { WebApp: RawTgWebApp } = window?.Telegram || {};
    if (RawTgWebApp) {
      RawTgWebApp.onEvent("viewportChanged", () => {
        if (!RawTgWebApp.isExpanded) {
          WebApp.expand();
        }
      });
    }
    if (isTelegram) {
      if (window?.Telegram?.WebApp?.enableClosingConfirmation) {
        window?.Telegram?.WebApp?.enableClosingConfirmation();
      }
    }
  }, [initData?.user, WebApp, isTelegram]);

  useEffect(() => {
    if (!isTelegram && typeof window !== "undefined") {
      window.removeEventListener("scroll", () => {
        window.scrollTo(0, overflow);
      });

      document.body.style.overflowY = "auto";
      document.body.style.paddingTop = `0px`;
      document.body.style.height = "auto";
      document.body.style.paddingBottom = `0px`;

      return;
    }
    const overflow = 0;
    document.body.style.overflowY = "hidden";
    document.body.style.paddingTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;

    const chatNav = document.getElementById("chat-nav") as HTMLElement;

    if (chatNav) {
      chatNav.style.paddingTop = `-${overflow}px`;
    }

    window.scrollTo(0, overflow);
    const scrollCb = () => {
      window.scrollTo(0, overflow);
    };
    window.addEventListener("scroll", scrollCb);
    // @ts-ignore
    document.querySelector("#root").style.overflowY = "auto";
    return () => {
      window.removeEventListener("scroll", scrollCb);
    };
  }, [isTelegram]);

  useEffect(() => {
    if (WebApp) {
      WebApp.expand();
    }
  }, [WebApp]);

  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <div id="tgapp" className="w-full">
        {children}
      </div>
      <TgBackBtn />
    </WebAppProvider>
  );
}

function TgBackBtn() {
  const path = usePathname();
  const router = useRouter();
  const shouldShowBackBtnForMain = useActivePage("/");
  const shouldShowBackBtnForEnterReferral = useActivePage("enter-referral");
  const [backButton] = initBackButton();

  if (typeof window != "undefined") {
    window?.Telegram?.WebApp?.BackButton.onClick(() => {
      router.back();
    });
    window?.Telegram?.WebApp?.setHeaderColor("#000");
  }

  useEffect(() => {
    if (!(shouldShowBackBtnForMain || shouldShowBackBtnForEnterReferral)) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [shouldShowBackBtnForMain, shouldShowBackBtnForEnterReferral, path]);

  return <></>;
}
