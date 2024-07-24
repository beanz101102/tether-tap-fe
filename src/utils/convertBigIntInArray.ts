export function convertBigIntInArray(arr: any[]) {
  if (arr?.length === 0 || !arr) return arr;
  return arr.map((item) => {
    const convertedItem: {
      [key: string]: any;
    } = {};
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "bigint") {
        if (
          value > BigInt(Number.MAX_SAFE_INTEGER) ||
          value < BigInt(Number.MIN_SAFE_INTEGER)
        ) {
          console.warn(
            "Converting a BigInt to Number might lose precision",
            key,
          );
        }
        convertedItem[key] = Number(value);
      } else {
        convertedItem[key] = value;
      }
    }
    return convertedItem;
  });
}
