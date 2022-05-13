import { useStore } from "effector-react";
import { messagesEntitiesModel } from "entities/messages";
import { ChatForm } from "features/chat-form";
import { Messages } from "features/messages";
import {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { BaseLoader } from "shared/components";
import "./chat-block.scss";

interface Props {}

const { $messages, $isLoading } = messagesEntitiesModel;

export const ChatBlock: FC<Props> = (): ReactElement => {
  const messages = useStore($messages);

  const isLoading = useStore($isLoading);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const messagesListRef = useRef<HTMLDivElement | null>(null);

  const scrollBottom = useCallback(() => {
    messagesRef.current?.scrollTo({
      top: messagesListRef.current?.clientHeight,
    });
  }, []);

  useEffect(() => {
    if (messages?.length) {
      scrollBottom();
    }
  }, [scrollBottom, messages]);

  return (
    <div className="chat-block">
      {!!messages && (
        <Fragment>
          {!!messages.length && (
            <div ref={messagesRef} className="chat-block__messages">
              <Messages innerRef={messagesListRef} />
            </div>
          )}
          {!messages.length && (
            <div className="chat-block__empty">
              <span className="chat-block__empty-item">
                Здесь пока ничего нет...
              </span>
            </div>
          )}
          <ChatForm />
        </Fragment>
      )}
      {isLoading && <BaseLoader isWhite />}
    </div>
  );
};
