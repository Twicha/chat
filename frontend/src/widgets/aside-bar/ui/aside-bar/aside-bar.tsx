import { FC, ReactElement } from "react";

import { reflect } from "@effector/reflect";

import classNames from "classnames";

import { Contacts, Settings, Chats } from "shared/icon-components";

import { Chats as ChatsList } from "features/chats-list";

import { asideBarModel, EAsideBarTabs } from "../../";

import "./aside-bar.scss";

interface Props {
  tabs: EAsideBarTabs[];
  selectedTab: EAsideBarTabs;
  isContactsTab: boolean;
  isChatsTab: boolean;
  isSettingsTab: boolean;
}

const icons: Record<EAsideBarTabs, ReactElement> = {
  contacts: <Contacts className="aside-bar-tabs__item-icon" />,
  chats: <Chats className="aside-bar-tabs__item-icon" />,
  settings: <Settings className="aside-bar-tabs__item-icon" />,
};

const {
  $tabs,
  $selectedTab,
  $isContactsTab,
  $isChatsTab,
  $isSettingsTab,
  setSelectedTab,
} = asideBarModel;

export const View: FC<Props> = ({
  tabs,
  selectedTab,
  isContactsTab,
  isChatsTab,
  isSettingsTab,
}): ReactElement => {
  return (
    <aside className="aside-bar">
      <div className="aside-bar-content">
        {isContactsTab && <div>contacts</div>}
        {isChatsTab && <ChatsList />}
        {isSettingsTab && <div>settings</div>}
      </div>
      <div className="aside-bar-tabs">
        {tabs.map((tab) => {
          const isActive: boolean = tab === selectedTab;

          return (
            <button
              key={tab}
              className={classNames("aside-bar-tabs__item", {
                "aside-bar-tabs__item--active": isActive,
              })}
              onClick={() => setSelectedTab(tab)}
            >
              {icons[tab]}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export const AsideBar = reflect({
  view: View,
  bind: {
    tabs: $tabs,
    selectedTab: $selectedTab,
    isContactsTab: $isContactsTab,
    isChatsTab: $isChatsTab,
    isSettingsTab: $isSettingsTab,
  },
});
