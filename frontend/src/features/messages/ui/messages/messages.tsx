import { FC, ForwardedRef, ReactElement, useEffect } from "react";

import classNames from "classnames";

import { isThisYear } from "date-fns";

import { useStore } from "effector-react";

import { getFormattedDate } from "shared/helpers/getFormattedDate";

import { accountModel } from "entities/account";

import { $messagesByDay } from "../../model";

import "./messages.scss";

interface Props {
  innerRef: ForwardedRef<HTMLDivElement | null>;
}

const { $accountId } = accountModel;

export const Messages: FC<Props> = ({ innerRef }): ReactElement => {
  const accountId = useStore($accountId);

  const messagesByDay = useStore($messagesByDay);

  useEffect(() => {
    console.log(1);

    return () => {
      console.log(2);
    };
  }, []);

  return (
    <div ref={innerRef} className="chat-block-messages__list">
      {messagesByDay?.map(({ date, messages }) => {
        const localDate: Date = new Date(date);

        const dateLabelFormat: string = `dd	MMMM ${
          !isThisYear(localDate) ? "yyyy г." : ""
        }`;

        const dateLabel: string = getFormattedDate(date, dateLabelFormat);

        return (
          <div key={date} className="chat-block-messages__list-block">
            <time
              className="chat-block-messages__list-block-date"
              dateTime={getFormattedDate(date, "yyyy-MM-dd")}
            >
              {dateLabel}
            </time>

            {messages.map(({ userId, id, text, createdAt }) => {
              const isMyMessage: boolean = userId === accountId;

              return (
                <div
                  key={id}
                  className={classNames(
                    "chat-block-messages__list-block-item",
                    {
                      "chat-block-messages__list-block-item--my-message":
                        isMyMessage,
                    }
                  )}
                >
                  <div>{userId}</div>
                  <p>{text}</p>
                  <time dateTime={getFormattedDate(createdAt, "yyyy-MM-dd")}>
                    {getFormattedDate(createdAt, "HH:mm")}
                  </time>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
