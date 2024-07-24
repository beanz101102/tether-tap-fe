export const truncateAddress = (
  address: string | undefined | null,
  truncateNumber = 4,
): string => {
  if (!address) return "";
  return `${address.substring(0, truncateNumber + 1)}...${address.substring(address.length - truncateNumber)}`;
};
