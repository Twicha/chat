import { sample } from "effector";
import { asideBarDomain } from "./domain";
import { EAsideBarTabs } from "./types";

const tabsEnumValues: EAsideBarTabs[] = Object.values(EAsideBarTabs);

// Stores

export const $tabs =
  asideBarDomain.createStore<EAsideBarTabs[]>(tabsEnumValues);

export const $selectedTab = asideBarDomain.createStore<EAsideBarTabs>(
  EAsideBarTabs.CHATS
);

export const $isContactsTab = $selectedTab.map(
  (state) => state === EAsideBarTabs.CONTACTS
);

export const $isChatsTab = $selectedTab.map(
  (state) => state === EAsideBarTabs.CHATS
);

export const $isSettingsTab = $selectedTab.map(
  (state) => state === EAsideBarTabs.SETTINGS
);

// Events

export const setSelectedTab = asideBarDomain.createEvent<EAsideBarTabs>();

// Logic

sample({ clock: setSelectedTab, target: $selectedTab });
