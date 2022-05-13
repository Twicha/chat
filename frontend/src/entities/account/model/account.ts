import { createDomain, sample } from "effector";
import { getUser } from "shared/api/users";
import { User } from "../../../../../types";

const accountDomain = createDomain("accountDomain");

// Stores

export const $accountId = accountDomain.createStore<string | null>(
  localStorage.getItem("accountId")
);

export const $account = accountDomain.createStore<User | null>(null);

// Events

export const setAccountId = accountDomain.createEvent<string>();

export const fetchAccount = accountDomain.createEvent<string>();

// Effects

export const fetchAccountFx = accountDomain.createEffect(getUser);

// Logic

sample({ clock: fetchAccount, target: fetchAccountFx });

sample({
  clock: fetchAccountFx.doneData,
  fn: (user) => user,
  target: $account,
});

sample({
  clock: setAccountId,
  fn: (accountId: string) => {
    localStorage.setItem("accountId", accountId);

    console.log(accountId);

    return accountId;
  },
  target: $accountId,
});
