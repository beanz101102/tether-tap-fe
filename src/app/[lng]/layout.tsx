"use client";
import { ListenWsUpdateGlobal } from "@/components/common/ListenWsUpdateGlobal";
import LayoutTapGame from "@/features/tap-game/layout";
import { ProviderRedux } from "@/libs/redux/provider";
import { ProviderSocket } from "@/libs/socket/provider";
import { ProviderTelegram } from "@/libs/telegram/provider";
import { TRPCReactProvider } from "@/trpc/react";
import { DefaultToastOptions, Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SDKProvider } from "@tma.js/sdk-react";
import {useTelegram} from "@/libs/telegram/hooks/useTelegram";

export const toastOptions: DefaultToastOptions = {
  style: {
    backgroundColor: "rgb(var(--main-accent))",
  },
  className: "main-text-primary",
  success: { duration: 1200 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isTelegram = useTelegram();

  if(!isTelegram){
    return  (
      <ProviderRedux>
        <TRPCReactProvider>
          <ToastContainer
            autoClose={4000}
            hideProgressBar
            draggable
            pauseOnHover
          />
          <Toaster position="top-center" toastOptions={toastOptions} />
          <ListenWsUpdateGlobal />
          <LayoutTapGame>{children}</LayoutTapGame>
        </TRPCReactProvider>
    </ProviderRedux>
    )
}

  return (
    <SDKProvider acceptCustomStyles debug>
      <ProviderTelegram>
        <ProviderRedux>
          <ProviderSocket>
            <TRPCReactProvider>
              <ToastContainer
                autoClose={4000}
                hideProgressBar
                draggable
                pauseOnHover
              />
              <Toaster position="top-center" toastOptions={toastOptions} />
              <ListenWsUpdateGlobal />
              <LayoutTapGame>{children}</LayoutTapGame>
            </TRPCReactProvider>
          </ProviderSocket>
        </ProviderRedux>
      </ProviderTelegram>
    </SDKProvider>
  );
}
