/* eslint-disable react/prop-types */
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

const AppBar = ({ isLoggedIn }) => {
  return <> {isLoggedIn ? <UserMenu /> : <AuthNav />}</>;
};

export default AppBar;
