/* eslint-disable import/no-named-as-default */
import BigNumber from "bignumber.js";
import {isNil, min} from "lodash";
import numeral from "numeral";

export const formatNumberWithNumeral = (
  val: number | string,
  suffix?: number,
): string => {
  const stringDefault = "0000000000";
  try {
    const num = new BigNumber(val);

    if (val.toString())
      if (num.isLessThan(1))
        return num.toFixed(suffix || 3, BigNumber.ROUND_DOWN);
      else if (num.isLessThan(1000)) {
        const newData = num.toFixed(suffix || 4, BigNumber.ROUND_DOWN);
        return numeral(newData).format(
          `0,0.${stringDefault.slice(0, suffix ?? 4)}`,
        );
      } else if (num.isLessThan(1000000)) {
        const newData = num.toFixed(
          Number(Number(suffix) < 2 ? suffix : 2),
          BigNumber.ROUND_DOWN,
        );
        return numeral(newData).format("0,0.00");
      } else {
        const newData = num.toFixed(
          Number(Number(suffix) < 2 ? suffix : 2),
          BigNumber.ROUND_DOWN,
        );
        return numeral(newData).format("0,0");
      }
    else return "0.000";
  } catch (e) {
    return "0.000";
  }
};

export const truncateFractionAndFormat = (
  parts: Intl.NumberFormatPart[],
  digits: number,
) => {
  return parts
    .map(({ type, value }) => {
      if (type !== "fraction" || !value || value.length < digits) return value;

      let retVal = "";
      for (
        let idx = 0, counter = 0;
        idx < value.length && counter < digits;
        idx++
      ) {
        if (value[idx] !== "0") counter++;

        retVal += value[idx];
      }
      return retVal;
    })
    .reduce((string, part) => string + part);
};

export function formatAmount(
  n: number,
  decimals?: number,
  compactDisplay?: boolean,
  hiddenTrailingZeros = false,
) {
  if (isNil(compactDisplay))
    if (n < 1) decimals = min([decimals, 8]);
    else if (n < 10) decimals = min([decimals, 6]);
    else if (n < 100) decimals = min([decimals, 5]);
    else if (n < 1_000) decimals = min([decimals, 4]);
    else if (n < 10_000) decimals = min([decimals, 3]);
    else if (n < 100_000) decimals = min([decimals, 2]);
    else if (n < 1_000_000) decimals = min([decimals, 1]);
    else if (n < 1_000_000_000) decimals = 0;
    else {
      compactDisplay = true;
      decimals = 1;
    }

  const formatter = new Intl.NumberFormat("en", {
    minimumFractionDigits: hiddenTrailingZeros ? undefined : decimals,
    maximumFractionDigits: decimals,
    notation: compactDisplay ? "compact" : "standard",
  });
  return truncateFractionAndFormat(
    formatter.formatToParts(n),
    decimals as number,
  );
}

export const formatAirdropAmount = (val: number | string): string => {
  return numeral(val).format("0,0");
};

export const roundDownNumber = (num: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.floor(num * multiplier) / multiplier;
};

export const roundUpNumber = (num: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.ceil(num * multiplier) / multiplier;
};

export const formatNumberWithCommas = (number: number, precision: number = 0) => {
  const numberType = Number(number);
  if (isNaN(numberType)) {
    return "0";
  }

  // Handle small numbers with fixed precision
  if (numberType < 1 && numberType > 0 && precision >= 1) {
    // Convert number to a string with specified precision, remove trailing zeros
    let fixedNumber = numberType.toPrecision(precision);
    return fixedNumber.replace(/0+$/, "").replace(/\.$/, "").toString();
  }

  if (numberType < 1000) {
    return numberType.toString();
  } else {
    return numberType.toLocaleString();
  }
};

export const formatLargeNumber = (number: number, decimal: boolean = true) => {
  const format = (n: number) =>
    decimal ? roundDownNumber(n, 3).toString() : Math.floor(n).toString();
  if (isNaN(number)) {
    return "0";
  }
  if (number >= 1000000000) {
    return `${format(number / 1000000000)}B`;
  } else if (number >= 1000000) {
    return `${format(number / 1000000)}M`;
  } else if (number >= 1000) {
    return `${format(number / 1000)}K`;
  } else {
    return format(number);
  }
};

export const formatPoint = (point: number) => {
  if (point > 99999) {
    return formatLargeNumber(point);
  }

  return formatNumberWithCommas(point);
};
