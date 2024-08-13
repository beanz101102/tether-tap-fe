import { atom } from "jotai";
import { FriendData } from "@/features/tap-game/interfaces/tap-game";

export const FriendsAtom = atom<FriendData[]>([]);
export const ScoreAtom = atom("0");
export const openModalLevelUpAtom = atom(false);

export interface UserCoinsLevelInfo {
  coins_to_level_up: number;
  current_level: number;
  max_level: number;
  current_level_name: string;
}

export interface UserTapGameInfo {
  bonus_coins_from_last_time_online: number;
  coins_balance: number;
  coins_bonus_per_hour: number;
  coins_earned_per_tap: number;
  coins_per_tap_level: number;
  energy_balance: number;
  energy_last_updated: number;
  is_already_reset_max_energy: boolean;
  max_energy_level: number;
  max_energy_reached: number;
}

export const ChainId = {
  BNB: process.env.NEXT_PUBLIC_IS_DEV ? 97 : 56,
  ETH: process.env.NEXT_PUBLIC_IS_DEV ? 5 : 1,
  BASE: process.env.NEXT_PUBLIC_IS_DEV ? 84532 : 8453,
  ARB: process.env.NEXT_PUBLIC_IS_DEV ? 421613 : 42161,
}