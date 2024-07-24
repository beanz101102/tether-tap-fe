"use client";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { cn } from "@/utils/cn";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";

const Roadmap = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "roadmap",
  });
  // const { open, setOpen, openModal } = useModal();
  const listRoadmap = [
    {
      isActive: true,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
  ];
  return (
    <div>
      <div className={"mt-4 px-4 pb-6"}>
        <p className="main-text-primary pb-6 text-center text-lg font-semibold">
          {t("title")}
        </p>
        {listRoadmap?.map((e, idx) => {
          return (
            <div key={`item-roadmap-${idx}`}>
              <div className={"flex items-center"}>
                {e?.isActive ? (
                  <FaCircleCheck
                    className={cn("h-6 w-6", "fill-emerald-500")}
                  />
                ) : (
                  <div
                    className={
                      "flex h-6 w-6 items-center justify-center rounded-full bg-white"
                    }
                  >
                    <FaArrowRight className={"h-4 w-4 text-[#27272A]"} />
                  </div>
                )}
                <p className={"main-text-primary ml-2 text-base font-normal"}>
                  {t(`roadmap_${idx + 1}`)}
                </p>
              </div>
              {idx !== listRoadmap?.length - 1 && (
                <div
                  className={cn(
                    "main-border-color ml-3 h-[30px] w-[1px] border",
                    !e?.isActive && "border-dashed",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
