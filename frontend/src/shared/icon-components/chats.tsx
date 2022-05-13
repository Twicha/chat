import { FC, ReactElement } from "react";

interface Props {
  className?: string;
}

export const Chats: FC<Props> = ({ className }): ReactElement => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.24588 19.5716C6.64588 20.8316 3.16667 21.825 2 22C2.33333 21.125 3.82637 18.85 3.5 16.75L3.48261 16.6821C1.93706 15.0185 1 12.8377 1 10.45C1 5.23091 5.47715 1 11 1C16.5228 1 21 5.23091 21 10.45C21 15.6691 16.5228 19.9 11 19.9M8.24588 19.5716C9.12361 19.7857 10.047 19.9 11 19.9M8.24588 19.5716L8.28043 19.5463C9.14511 19.7767 10.0573 19.9 11 19.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
