import axios from "axios";
import { config } from "config";
import { FC, FormEvent, MouseEvent, ReactElement, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { WhiteBox, BaseInput, InputChangePayload } from "shared/components";
import "./signup.scss";

interface Props {}

const formDataPlaceholders: Record<keyof FormData, string> = {
  username: "Введите свой никнейм",
  firstname: "Введите своё имя",
  phone: "Введите свой номер телефона",
};

export interface FormData {
  firstname: string;
  username: string;
  phone: string;
}

export const SignupPage: FC<Props> = (): ReactElement => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    username: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeFormDataHandler = ({ name, value }: InputChangePayload) => {
    setFormData((prev) => {
      const localPrev = { ...prev };

      if (name) {
        localPrev[name as keyof FormData] = value;
      }

      return localPrev;
    });
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${config.baseUrl}/api/users`, formData)
      .then((res) => {
        localStorage.setItem("accountId", res.data.id);

        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const formDataKeys = Object.keys(formData) as Array<keyof FormData>;

  const isAuth: boolean = !!localStorage.getItem("accountId");

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup-page">
      <WhiteBox className="signup-page-form__wrap">
        <form onSubmit={onSubmitHandler} className="signup-page-form">
          <h2 className="signup-page-form__title">Регистрация</h2>
          {formDataKeys.map((formDataKey) => (
            <BaseInput
              key={formDataKey}
              name={formDataKey}
              value={formData[formDataKey]}
              onChange={onChangeFormDataHandler}
              placeholder={formDataPlaceholders[formDataKey]}
            />
          ))}
          <button
            onClick={onSubmitHandler}
            type="submit"
            className="signup-page-form__btn"
          >
            Регистрация
          </button>
        </form>
        <Link
          style={{ marginTop: "3rem", color: "black", fontSize: "1.6rem" }}
          to="/signin"
        >
          Войти
        </Link>
      </WhiteBox>
    </div>
  );
};
