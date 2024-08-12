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
  coins_balance: number;
  coins_earned_per_tap: number;
  energy_balance: number;
  max_energy_reached: number;
  user_coins_level_info: UserCoinsLevelInfo;
  coins_per_tap_level: number;
  max_energy_level: number;
  is_already_reset_max_energy: boolean;
}
