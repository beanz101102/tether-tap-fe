import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { uniqBy } from "lodash";
import { FriendsAtom } from "@/features/tap-game/constants/tap-game";
import { convertBigIntInArray } from "@/utils/convertBigIntInArray";
import { FriendData } from "@/features/tap-game/interfaces/tap-game";
import { api } from "@/trpc/react";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

export const useGetFriends = () => {
  const [hasMore, setHasMore] = useState(true);
  const [friends, setFriends] = useAtom(FriendsAtom);
  const [page, setPage] = useState(1);
  const { currentUser } = useGetCurrentUser();
  const { data, isLoading } = api.tapGame.getFriends.useQuery(
    {
      userId: Number(currentUser?.id),
      page: page,
      limit: 10,
    },
    {
      refetchInterval: 20000,
    },
  );

  const friendsDataMapping = convertBigIntInArray(
    data as FriendData[],
  ) as FriendData[];

  useEffect(() => {
    if (!data || isLoading) return;
    if ((data as FriendData[])?.length < 10) {
      // data got less than limit per page
      setHasMore(false);
    }

    setFriends((prev) => {
      return uniqBy([...prev, ...friendsDataMapping], "id");
    });
  }, [JSON.stringify(friendsDataMapping), data, isLoading]);

  console.log("friends", friends);

  return {
    friends,
    handleGetMore: () => setPage((prev) => prev + 1),
    isLoading: isLoading,
    hasMore,
  };
};
