"use client";
import { GeistSans } from "geist/font/sans";
import "@/styles/global.scss";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const enableEruda = false;
  useEffect(() => {
    if (typeof window !== "undefined" && enableEruda) {
      setTimeout(() => {
        console.log("init eruda", (window as any).eruda);
        if ((window as any).eruda) {
          (window as any).eruda?.init();
        }
      }, 50);
    }
  }, []);
  const [isProtocolLoaded, setIsProtocolLoaded] = useState(false);
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Script
          src="/en/protocol.js"
          onLoad={() => {
            setIsProtocolLoaded(true);
          }}
        ></Script>
        {isProtocolLoaded && (
          <Script src="/en/nano-websocket-client.js" async></Script>
        )}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          async
        ></Script>
        {enableEruda && (
          <>
            <Script src="//cdn.jsdelivr.net/npm/eruda"></Script>
          </>
        )}
      </head>
      <body
        className="dark"
        style={{
          background: "black",
        }}
      >
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
