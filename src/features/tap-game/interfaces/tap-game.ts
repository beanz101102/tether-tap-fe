export interface AnimationPositionPerTap {
  id: number;
  x: number;
  y: number;
  value: number;
}

export interface Friend {
  name: string;
  avatar: string | null;
  totalCoinsEarned: number;
  coinsGainedFromInvitation: number;
}

export interface FriendData {
  avatar_url: string;
  changed_amount: number;
  display_name: string;
  total_coins_earned: number;
}

export enum SpecificActionStatus {
  REWARDS_AVAILABLE = "AVAILABLE",
  REWARDS_CLAIMED = "CLAIMED",
  REWARDS_UNCLAIMABLE = "UNCLAIMABLE",
}

export enum KeyCheckUserSpecificActionStatus {
  FOLLOW_TWITTER = "FOLLOW_TWITTER",
  JOIN_TELEGRAM_CHANEL = "JOIN_TELEGRAM_CHANNEL",
}

export interface CheckUserSpecificActionStatusData {
  [key: string]: boolean;
}

export interface ListRankingProps {
  name: string;
  milestone: number;
  img: string;
  level: number;
  coinPerTap: number;
  energy: number;
  min: number;
  max: number;
  isMaxLevel?: boolean;
  bonusEnergy: number;
}

export enum QuestType {
  TELEGRAM,
  TWITTER,
}

export enum IQuestType {
  DAILY = 0,
  NEWBIE = 1,
  TELEGRAM = 2,
  TWITTER_DAILY,
}

export interface IQuests {
  id: number;
  name: string;
  type: IQuestType;
  status: QuestStatus;
  description: string;
  quests: IQuest[];
  totalPendingBox?: number;
}

export enum QuestStatus {
  ONGOING = "Ongoing",
  DONE = "Done",
}

export interface IQuest {
  id: number;
  name: IQuestAction;
  description: string;
  status: QuestStatus;
  pre_condition: string | null;
  type: IQuestType;
  pending_box: number;
  action_url: string;
}

export enum IQuestAction {
  RETWEET = "retweet",
  FOLLOW = "follow",
  NOTIFICATION = "notification",
  TELEGRAM_JOIN_GROUP = "check_user_join_tg_group",
  TELEGRAM_JOIN_CHANNEL = "check_user_join_tg_channel",
}
