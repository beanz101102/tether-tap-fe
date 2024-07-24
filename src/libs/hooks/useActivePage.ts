import { usePathname } from "next/navigation";

export const useActivePage = (page: string) => {
  const pathname = usePathname();
  const pattern =
    page === "/" ? /^\/[a-z]{2}\/?$/ : new RegExp(`^\/[a-z]{2}\/${page}\/?$`);
  return pattern.test(pathname);
};
