"use client";
import { cn } from "@/utils/cn";

const LayoutTapGame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("mx-auto	 h-[100vh] w-full max-w-[500px] bg-black")}>
      <div
        className={cn(
          "hide-scrollbar relative h-full overflow-auto",
        )}
        style={{
          maxHeight: "calc(100vh - 90px)"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutTapGame;
