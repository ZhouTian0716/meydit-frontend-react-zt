import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getAccount, getToken } from "../../redux/reducers/authSlice";

interface IProps {
  allowRole?: "Client" | "Maker";
}

const ProtectedRoutes = ({ allowRole }: IProps) => {
  // Redux
  const { token } = useAppSelector(getToken);
  const { role } = useAppSelector(getAccount);
  const loginRole = role.name;
  const location = useLocation();
  const isRoleBased = Boolean(allowRole);
  const notRoleBasedContent = token ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;

  let roleBasedContent: JSX.Element;
  if (loginRole === allowRole) {
    roleBasedContent = <Outlet />;
  } else if (token) {
    roleBasedContent = <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    roleBasedContent = <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return isRoleBased ? roleBasedContent : notRoleBasedContent;
};

export default ProtectedRoutes;
