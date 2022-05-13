import { useStore } from "effector-react";
import { FC, ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import "./settings.scss";

interface Props {}

export const SettingsPage: FC<Props> = (): ReactElement => {
  // const users = useStore($users);

  const users: any = [];

  // useEffect(() => {
  //   fetchGetUsersFx();
  // }, []);

  const onDeleteUserHandler = async (id: string) => {
    const isConfirm: boolean = window.confirm(
      "Вы действительно хотите удалить этого пользователя?"
    );

    // if (isConfirm) {
    //   await fetchDeleteUserFx(id).then((res) => {
    //     console.log(res);
    //   });
    // }
  };

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Settings</h1>
      <div className="settings-page-users">
        <h2 className="settings-page-users__title">Пользователи</h2>
        <ul className="settings-page-users__list">
          {users.map(({ id, firstname }: any) => (
            <li key={id} className="settings-page-users__list-item">
              <span className="settings-page-users__list-item-username">
                {firstname}
              </span>
              <button
                className="settings-page-users__list-item-btn"
                onClick={() => onDeleteUserHandler(id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/">Chats</Link>
    </div>
  );
};
