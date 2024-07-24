"use client";
import { cn } from "@/utils/cn";

const LayoutTapGame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("mx-auto	 h-[100vh] w-full max-w-[500px] bg-black")}>
      <div
        className={cn(
          "hide-scrollbar relative h-full max-h-[100vh] overflow-auto",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutTapGame;
