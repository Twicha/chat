import { accountModel } from "entities/account";
import { chatsModel } from "entities/chats";
import { FC, ReactElement, useCallback, useEffect } from "react";
import { Chat } from "../../../../../../types";
import emptyAvatar from "shared/images/empty-avatar.svg";
import "./chats-list.scss";
import { reflect } from "@effector/reflect";
import { messagesEntitiesModel } from "entities/messages";
import { ChatCard } from "../chat-card/chat-card";

interface Props {
  accountId: string | null;
  chats: Chat[];
  selectedChatId: string | null;
}

const { setSelectedChatId, fetchChats, $chats, $selectedChatId } = chatsModel;

const { $accountId } = accountModel;

const { resetMessages } = messagesEntitiesModel;

export const View: FC<Props> = ({
  accountId,
  chats,
  selectedChatId,
}): ReactElement => {
  useEffect(() => {
    if (accountId) {
      fetchChats({ userId: accountId });
    }
  }, [accountId]);

  const onSelectChat = useCallback(
    (id: string) => {
      if (id !== selectedChatId) {
        resetMessages();
      }

      setSelectedChatId(id);
    },
    [selectedChatId]
  );

  return (
    <div className="chats-list">
      {chats.map(({ id, partner }: any) => {
        const avatarUrl: string = partner.avatarUrl
          ? partner.avatarUrl
          : emptyAvatar;

        const isActive: boolean = id === selectedChatId;

        return (
          <ChatCard
            isActive={isActive}
            avatarUrl={avatarUrl}
            id={id}
            onClick={() => onSelectChat(id)}
            title={partner.firstname}
          />
        );
      })}
    </div>
  );
};

export const Chats = reflect<Props>({
  view: View,
  bind: {
    accountId: $accountId,
    chats: $chats,
    selectedChatId: $selectedChatId,
  },
});
