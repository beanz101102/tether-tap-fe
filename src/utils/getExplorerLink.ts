export const explorerUrlPerChainId: {
  [key: number]: string;
} = {
  421614: "https://sepolia.arbiscan.io",
  42161: "https://arbiscan.io",
  84532: "https://sepolia.basescan.org",
  8453: "https://basescan.org",
  97: 'https://testnet.bscscan.com',
  56:  'https://bscscan.com'
};

export function getExplorerLink(
  urlHash: string | number,
  type: "transaction" | "token" | "address" | "countdown" | "block",
  _currentChainId = 84532,
): string {
  const prefix = explorerUrlPerChainId[_currentChainId];

  switch (type) {
    case "transaction": {
      return `${prefix}/tx/${urlHash}`;
    }
    case "token": {
      return `${prefix}/token/${urlHash}`;
    }
    case "countdown": {
      return `${prefix}/block/countdown/${urlHash}`;
    }
    case "block": {
      return `${prefix}/block/${urlHash}`;
    }
    case "address":
    default: {
      return `${prefix}/address/${urlHash}`;
    }
  }
}
