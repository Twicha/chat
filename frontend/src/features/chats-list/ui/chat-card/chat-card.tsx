import classNames from "classnames";
import { FC, ReactElement } from "react";
import "./chat-card.scss";

interface Props {
  onClick: () => void;
  isActive: boolean;
  avatarUrl: string;
  id: string;
  title: string;
}

export const ChatCard: FC<Props> = ({
  onClick,
  isActive,
  avatarUrl,
  id,
  title,
}): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={classNames("chat-card", {
        "chat-card--active": isActive,
      })}
    >
      <img src={avatarUrl} className="chat-card__img" alt={id} />
      <div className="chat-card-info">
        <div className="chat-card-info__container">
          <h3 className="chat-card-info__title">{title}</h3>
          <time className="chat-card-info__posted">{}</time>
        </div>
        <p className="chat-card-info__message">{}</p>
      </div>
    </button>
  );
};
