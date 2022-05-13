import { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  redirectUrl?: string;
  access?: boolean;
  component: ReactElement;
}

export const PrivateRoute: FC<Props> = ({
  redirectUrl,
  access,
  component: RouteComponent,
}) => {
  const hasNotAccess: boolean = access !== undefined && !access;

  const localRedirectUrl: string = redirectUrl || "/signin";

  if (hasNotAccess) {
    return <Navigate to={localRedirectUrl} />;
  }

  return RouteComponent;
};
