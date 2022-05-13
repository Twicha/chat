import axios from "axios";
import { config } from "config";
import { accountModel } from "entities/account";
import { FC, FormEvent, ReactElement, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { WhiteBox, BaseInput, InputChangePayload } from "shared/components";
import "./signin.scss";

interface Props {}

const formDataPlaceholders: Record<keyof FormDataSingin, string> = {
  phone: "Введите свой телефон",
};

export interface FormDataSingin {
  phone: string;
}

export const SigninPage: FC<Props> = (): ReactElement => {
  const [formData, setFormData] = useState<FormDataSingin>({
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeFormDataHandler = ({ name, value }: InputChangePayload) => {
    setFormData((prev) => {
      const localPrev = { ...prev };

      if (name) {
        localPrev[name as keyof FormDataSingin] = value;
      }

      return localPrev;
    });
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);

    axios
      .post(`${config.baseUrl}/api/login`, { phone: formData.phone })
      .then((res) => {
        console.log(res);

        if (res.data.id) {
          accountModel.setAccountId(res.data.id);

          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const formDataKeys = Object.keys(formData) as Array<keyof FormDataSingin>;

  const isAuth: boolean = !!localStorage.getItem("accountId");

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signin-page">
      <WhiteBox className="signin-page-form__wrap">
        <form onSubmit={onSubmitHandler} className="signin-page-form">
          <h2 className="signin-page-form__title">Вход</h2>
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
            className="signin-page-form__btn"
          >
            Вход
          </button>
        </form>
        <Link
          style={{ marginTop: "3rem", color: "black", fontSize: "1.6rem" }}
          to="/signup"
        >
          Зарегистрироваться
        </Link>
      </WhiteBox>
    </div>
  );
};
