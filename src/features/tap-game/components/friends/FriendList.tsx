import { Loading } from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import FriendItem from "./FriendItem";
import { useGetFriends } from "../../hooks/useGetFriends";
import { useTranslation } from "@/app/[lng]/i18n/client";
import NextImage from "@/components/common/next-image";

const FriendList = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "friends",
  });
  const { friends, isLoading, handleGetMore, hasMore } = useGetFriends();
  const renderFriendList = useCallback(() => {
    if (isLoading && friends?.length === 0) {
      return (
        <div className={"mt-6 flex h-full w-full items-center justify-center"}>
          <Loading className={"main-text-primary"} />
        </div>
      );
    }

    if (!friends?.length) {
      return (
        <div
          className={
            "mt-10 flex h-full w-full flex-col items-center justify-center"
          }
        >

                <p
                    className={
                        "main-text-secondary w-[80%] my-2 text-center text-base font-normal"
                    }
                >
                    {t("empty_list_friend")}
                </p>
        </div>
      );
    }

      return (
          <div>
        <div>
          {friends.map((friend, idx) => {
            return (
              <div key={`friend-row-${idx}`} className={"mb-2 px-4"}>
                <FriendItem
                  key={friend?.display_name}
                  friendCoins={friend.total_coins_earned}
                  name={friend?.display_name}
                  avatar={friend?.avatar_url || "/img/richard.svg"}
                  coinEarned={friend?.changed_amount}
                />
              </div>
            );
          })}
        </div>

        <div className={"flex w-full flex-col items-center justify-center"}>
          {isLoading && friends?.length > 0 ? (
            <Loading className={"main-text-primary"} />
          ) : hasMore ? (
            <Button
              disabled={isLoading}
              onClick={() => handleGetMore()}
              className={"!w-fit"}
              variant={"outline"}
            >
              {t("show_more")}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }, [friends, isLoading]);

  return (
    <div>
      <h4 className={"main-text-primary mb-3 px-4 text-lg font-semibold"}>
        {t("list_friends")}
      </h4>
      {/*<div className={'flex flex-col gap-2 w-full h-[42vh] overflow-y-auto hidden-scroll'}>*/}
      {renderFriendList()}
      {/*</div>*/}
    </div>
  );
};

export default FriendList;
