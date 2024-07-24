import { cn } from "@/utils/cn";
import Image from "next/image";
interface NextImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}
const NextImage = ({ alt, src, className , width = 0, height=0}: NextImageProps) => {
  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt={alt} height={height} width={width} layout="responsive" />
    </div>
  );
};

export default NextImage;
