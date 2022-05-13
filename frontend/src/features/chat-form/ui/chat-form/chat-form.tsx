import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useState,
} from "react";

import { reflect } from "@effector/reflect";

import socket from "socket";

import { accountModel } from "entities/account";

import { chatsModel } from "entities/chats";

import "./chat-form.scss";

interface Props {
  selectedChatId: string | null;
  accountId: string | null;
}

const { $accountId } = accountModel;

const { $selectedChatId } = chatsModel;

const View: FC<Props> = ({ selectedChatId, accountId }): ReactElement => {
  const [value, setValue] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;

    setValue(target.value);
  };

  const onSubmit = useCallback((): void => {
    socket.emit("ROOM:NEW_MESSAGE", {
      chatId: selectedChatId,
      userId: accountId,
      text: value,
    });

    setValue("");
  }, [value, selectedChatId, accountId]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const isEnterKey: boolean = e.key === "Enter";
    const isSubmitEvent: boolean = isEnterKey && !e.shiftKey && !e.ctrlKey;

    if (isSubmitEvent) {
      e.preventDefault();

      if (value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="chat-block-form">
      <textarea
        value={value}
        onChange={onChangeHandler}
        rows={3}
        className="chat-block-form__field"
        onKeyPress={onKeyDown}
      ></textarea>
      <button type="submit" className="chat-block-form__btn">
        Отправить
      </button>
    </form>
  );
};

export const ChatForm = reflect<Props>({
  view: View,
  bind: {
    selectedChatId: $selectedChatId,
    accountId: $accountId,
  },
});
