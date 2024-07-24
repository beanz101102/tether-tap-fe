import { Fragment, useMemo } from 'react';
import AnimatedNumberItem from "@/components/ui/animated-number-item";

export interface AnimatedNumberProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: number;
  size?: number;
  hasComma?: boolean;
  duration?: number;
  order?: 'asc' | 'desc';
  minDigits?: number;
}

const AnimatedNumber = ({
  value,
  size = 14,
  hasComma = false,
  duration = 200,
  style,
  className,
  order = 'asc',
  minDigits,
  ...restProps
}: AnimatedNumberProps) => {
  const numberArray = useMemo(() => {
    const reversedNumberArray = String(value).split('').reverse();
    if (typeof minDigits === 'number' && reversedNumberArray.length < minDigits) {
      const lackOfDigits = minDigits - reversedNumberArray.length;
      Array.from({ length: lackOfDigits }).forEach(() => {
        reversedNumberArray.push('0');
      });
    }
    return reversedNumberArray;
  }, [value, minDigits]);

  const isMinus = useMemo(() => {
    return numberArray[numberArray.length - 1] === '-';
  }, [numberArray]);

  const decimalPointIndex = useMemo(() => {
    return numberArray.findIndex(value => value === '.');
  }, [numberArray]);

  const decimalLength = useMemo(() => {
    return decimalPointIndex > -1 ? decimalPointIndex : 0;
  }, [numberArray, decimalPointIndex]);

  return (
    <div
      className={className ? `AnimatedNumber ${className}` : 'AnimatedNumber'}
      style={{ ...style, height: size }}
      {...restProps}>
      {numberArray.map((number, index) => {
        const isInt = decimalLength ? index > decimalPointIndex : true;
        const intIndex = decimalLength ? index - decimalLength - 1 : index;
        const isCommaNeeded =
          hasComma &&
          isInt &&
          intIndex % 3 === 0 &&
          intIndex !== 0 &&
          (isMinus ? index !== numberArray.length - 1 : true);

        return (
          <Fragment key={index}>
            {isCommaNeeded && (
              <div
                className="AnimatedNumber__text main-text-primary"
                style={{
                  fontSize: size,
                  height: size,
                }}>
                ,
              </div>
            )}
            {isNaN(Number(number)) ? (
              <div
                className="AnimatedNumber__text main-text-primary"
                style={{
                  fontSize: size,
                  height: size,
                }}>
                {number}
              </div>
            ) : (
              <AnimatedNumberItem number={Number(number)} size={size!} duration={duration} order={order} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default AnimatedNumber;
