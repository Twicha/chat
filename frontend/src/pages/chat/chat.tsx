import { FC, ReactElement, useCallback, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import socket from "socket";
import "./chat.scss";
import { Message } from "../../../../types";
import { chatsModel } from "entities/chats";

import { reflect } from "@effector/reflect";
import { AsideBar } from "widgets/aside-bar";

import incomeMessageAudio from "shared/sounds/income-message.mp3";
import outcomeMessageAudio from "shared/sounds/outcome-message.mp3";
import { accountModel } from "entities/account";
import { messagesEntitiesModel } from "entities/messages";
import { ChatBlock } from "widgets/chat-block";

interface Props {
  selectedChatId: string | null;
  accountId: string | null;
  messages: Message[] | null;
}

const { $accountId } = accountModel;

const { $selectedChatId, setSelectedChatId } = chatsModel;

const { setMessages, fetchMessages, resetMessages } = messagesEntitiesModel;

const View: FC<Props> = ({ selectedChatId, accountId }): ReactElement => {
  const closeActiveChat = useCallback(
    (e: KeyboardEvent) => {
      const isEscapeKey = e.key === "Escape";

      if (isEscapeKey && selectedChatId) {
        resetMessages();
        setSelectedChatId(null);
      }
    },
    [selectedChatId]
  );

  const peerConnection: RTCPeerConnection = useMemo(
    () => new RTCPeerConnection(),
    []
  );

  const dataChannel: RTCDataChannel = useMemo(
    () => peerConnection.createDataChannel("test"),
    [peerConnection]
  );

  const rtcFunctionOpen = useCallback(() => {
    console.log("channel open");
  }, []);

  const rtcFunctionMessage = useCallback((e: MessageEvent) => {
    console.log(e.data);
  }, []);

  const rtcFunctionIceCandidate = useCallback(
    (e: RTCPeerConnectionIceEvent) => {
      console.log(JSON.stringify(peerConnection.localDescription));
    },
    [peerConnection]
  );

  useEffect(() => {
    dataChannel.addEventListener("open", rtcFunctionOpen);

    return () => {
      dataChannel.removeEventListener("open", rtcFunctionOpen);
    };
  }, [dataChannel, rtcFunctionOpen]);

  useEffect(() => {
    dataChannel.addEventListener("message", rtcFunctionMessage);

    return () => {
      dataChannel.removeEventListener("message", rtcFunctionMessage);
    };
  }, [dataChannel, rtcFunctionMessage]);

  useEffect(() => {
    peerConnection.addEventListener("icecandidate", rtcFunctionIceCandidate);

    return () => {
      peerConnection.removeEventListener(
        "icecandidate",
        rtcFunctionIceCandidate
      );
    };
  }, [peerConnection, rtcFunctionIceCandidate]);

  const createOffer = useCallback(async () => {
    peerConnection.setLocalDescription(await peerConnection.createOffer());
  }, [peerConnection]);

  useEffect(() => {
    createOffer();
  }, [createOffer]);

  useEffect(() => {
    document.addEventListener("keydown", closeActiveChat);
  }, [closeActiveChat]);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages({ chatId: selectedChatId });

      socket.emit("join", { chatId: selectedChatId, userId: accountId });
    }
  }, [selectedChatId, accountId]);

  useEffect(() => {
    socket.on("join", (users: any) => {
      console.log("join", users);
    });
  }, []);

  const onNewMessage = useCallback(
    (message: Message) => {
      setMessages(message);

      const isMyMessage: boolean = message.userId === accountId;

      const soundFile = isMyMessage ? outcomeMessageAudio : incomeMessageAudio;

      const audio: HTMLAudioElement = new Audio(soundFile);

      audio.play();
    },
    [accountId]
  );

  useEffect(() => {
    socket.on("ROOM:NEW_MESSAGE_ADD", onNewMessage);

    return () => {
      socket.off("ROOM:NEW_MESSAGE_ADD", onNewMessage);
    };
  }, [onNewMessage]);

  if (!accountId) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="chat-page">
      <AsideBar />
      <main className="chat-page-main">{selectedChatId && <ChatBlock />}</main>
    </div>
  );
};

export const ChatPage = reflect<Props>({
  view: View,
  bind: {
    selectedChatId: $selectedChatId,
    accountId: $accountId,
  },
});
