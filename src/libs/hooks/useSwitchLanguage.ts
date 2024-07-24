"use client";

import { LocaleTypes, locales } from "@/app/[lng]/i18n/settings";
import { usePathname, useRouter } from "next/navigation";

export const useSwitchLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string): string => {
    const segments = pathname!.split("/");
    const localeIndex = segments.findIndex((segment: string) =>
      locales.includes(segment as LocaleTypes),
    );
    if (localeIndex !== -1) {
      segments[localeIndex] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    // Remove trailing slash if it exists
    const newPath = segments.join("/").replace(/\/$/, "");
    return newPath;
  };

  const handleChangeLanguage = (newLocale: string) => {
    const resolvedUrl = handleLocaleChange(newLocale);
    localStorage.setItem("i18nextLng", newLocale);
    router.push(resolvedUrl);
  };
  return {
    handleChangeLanguage,
  };
};
