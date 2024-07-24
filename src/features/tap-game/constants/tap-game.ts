import { atom } from "jotai";
import {
  FriendData,
  ListRankingProps,
} from "@/features/tap-game/interfaces/tap-game";

export const FriendsAtom = atom<FriendData[]>([]);
export const ScoreAtom = atom(0);
export const openModalLevelUpAtom = atom(false);
export const TapLevel = {
  LEVEL_0: 0,
  LEVEL_1: 5000000,
  LEVEL_2: 25000000,
  LEVEL_3: 100000000,
  LEVEL_4: 1000000000,
  LEVEL_5: 2000000000,
  LEVEL_6: 10000000000,
  LEVEL_7: 50000000000,
  LEVEL_8: 100000000000,
  LEVEL_9: 200000000000,
};

export const listRanking = [
  {
    name: "novice",
    milestone: TapLevel.LEVEL_1,
    min: 0,
    max: TapLevel.LEVEL_1,
    img: "deer",
    level: 1,
    coinPerTap: 1000,
    energy: 1,
    bonusEnergy: 0,
  },
  {
    name: "adventurer",
    milestone: TapLevel.LEVEL_2,
    img: "tiger",
    level: 2,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_1,
    max: TapLevel.LEVEL_2,
    bonusEnergy: 500000,
  },
  {
    name: "champion",
    milestone: TapLevel.LEVEL_3,
    img: "leopard",
    level: 3,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_2,
    max: TapLevel.LEVEL_3,
    bonusEnergy: 1000000,
  },
  {
    name: "hero",
    milestone: TapLevel.LEVEL_4,
    img: "shark",
    level: 4,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_3,
    max: TapLevel.LEVEL_4,
    bonusEnergy: 1500000,
  },
  {
    name: "lord",
    milestone: TapLevel.LEVEL_5,
    img: "rhino",
    level: 5,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_4,
    max: TapLevel.LEVEL_5,
    bonusEnergy: 2000000,
  },
  {
    name: "high_lord",
    milestone: TapLevel.LEVEL_6,
    img: "bison",
    level: 6,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_5,
    max: TapLevel.LEVEL_6,
    bonusEnergy: 2500000,
  },
  {
    name: "legendary_lord",
    milestone: TapLevel.LEVEL_7,
    img: "elephant",
    level: 7,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_6,
    max: TapLevel.LEVEL_7,
    bonusEnergy: 3000000,
  },
  {
    name: "mythic_lord",
    milestone: TapLevel.LEVEL_8,
    img: "dino",
    level: 8,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_7,
    max: TapLevel.LEVEL_8,
    bonusEnergy: 3500000,
  },
  {
    name: "ethereal_lord",
    milestone: TapLevel.LEVEL_9,
    img: "kong",
    level: 9,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_8,
    max: TapLevel.LEVEL_9,
    bonusEnergy: 4000000,
  },
  {
    name: "over_lord",
    milestone: TapLevel.LEVEL_9,
    img: "boss",
    level: 10,
    coinPerTap: 1000,
    energy: 1,
    min: TapLevel.LEVEL_9,
    max: TapLevel.LEVEL_9,
    isMaxLevel: true,
    bonusEnergy: 5000000,
  },
];

export interface UserCoinsLevelInfo {
  coins_to_level_up: number;
  current_level: number;
  max_level: number;
  current_level_name: string;
}

export interface UserTapGameInfo {
  coins_balance: number;
  coins_earned_per_tap: number;
  energy_balance: number;
  max_energy_reached: number;
  user_coins_level_info: UserCoinsLevelInfo;
  coins_per_tap_level: number;
  max_energy_level: number;
  is_already_reset_max_energy: boolean;
}

export const levelNext: { [key: number]: number } = {
  [1]: TapLevel.LEVEL_1,
  [2]: TapLevel.LEVEL_2,
  [3]: TapLevel.LEVEL_3,
  [4]: TapLevel.LEVEL_4,
  [5]: TapLevel.LEVEL_5,
  [6]: TapLevel.LEVEL_6,
  [7]: TapLevel.LEVEL_7,
  [8]: TapLevel.LEVEL_8,
  [9]: TapLevel.LEVEL_9,
};

export const listUpgradeCoinsPerTap = [
  {
    Level: 1,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 0,
  },
  {
    Level: 2,
    CoinsPerTap: 1 * 1000,

    CoinsNeeded: 2000000,
  },
  {
    Level: 3,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 4000000,
  },
  {
    Level: 4,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 8000000,
  },
  {
    Level: 5,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 16000000,
  },
  {
    Level: 6,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 32000000,
  },
  {
    Level: 7,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 64000000,
  },
  {
    Level: 8,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 128000000,
  },
  {
    Level: 9,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 256000000,
  },
  {
    Level: 10,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 512000000,
  },
  {
    Level: 11,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 1024000000,
  },
  {
    Level: 12,
    CoinsPerTap: 1 * 1000,
    CoinsNeeded: 2048000000,
  },
];

export const listUpgradeEnergyByLevel = [
  {
    Level: 1,
    MaxEnergy: 1000,
    CoinsNeeded: 0,
  },
  {
    Level: 2,
    MaxEnergy: 500 * 1000,
    CoinsNeeded: 2000000,
  },
  {
    Level: 3,
    MaxEnergy: 500 * 1000,
    CoinsNeeded: 4000000,
  },
  {
    Level: 4,
    MaxEnergy: 500 * 1000,
    CoinsNeeded: 8000000,
  },
  {
    Level: 5,
    MaxEnergy: 500 * 1000,
    CoinsNeeded: 16000000,
  },
  {
    Level: 6,
    MaxEnergy: 750 * 1000,
    CoinsNeeded: 32000000,
  },
  {
    Level: 7,
    MaxEnergy: 750 * 1000,
    CoinsNeeded: 64000000,
  },
  {
    Level: 8,
    MaxEnergy: 750 * 1000,
    CoinsNeeded: 128000000,
  },
  {
    Level: 9,
    MaxEnergy: 750 * 1000,
    CoinsNeeded: 256000000,
  },
  {
    Level: 10,
    MaxEnergy: 1000 * 1000,
    CoinsNeeded: 512000000,
  },
  {
    Level: 11,
    MaxEnergy: 1000 * 1000,
    CoinsNeeded: 1024000000,
  },
  {
    Level: 12,
    MaxEnergy: 1000 * 1000,
    CoinsNeeded: 2048000000,
  },
];

export const action_type = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};

export enum baseReferReward {
  NORMAL = 5000000,
  PREMIUM = 25000000,
}

export const bonusReferByLevel: { [key: number]: number } = {
  1: 0,
  2: 7500000,
  3: 10000000,
  4: 25000000,
  5: 50000000,
  6: 75000000,
  7: 100000000,
  8: 250000000,
  9: 500000000,
  10: 1000000000,
};

export const maxLevelUpgrade = 12;
