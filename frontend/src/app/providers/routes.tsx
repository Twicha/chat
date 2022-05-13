import { SigninPage } from "pages";
import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private-route";

interface Props {}

export const AppRoutes: FC<Props> = (): ReactElement => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute access={false} component={<div>has access</div>} />
        }
      />
      <Route path="*" element={<div>404</div>} />
      <Route path="/signin" element={<SigninPage />} />
      
    </Routes>
  );
};
