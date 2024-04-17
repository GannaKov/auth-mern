import styles from "./AuthNav.module.css";
import { useNavigate } from "react-router-dom/dist";
import { NavLink, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";

const AuthNav = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <header className={styles.headerWrp}>
        <nav className={styles.headerNav}>
          <p>Here logo</p>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
              >
                Home
              </NavLink>
            </li>

            <div>
              <Button
                // color="red[500]"
                variant="contained"
                type="submit"
                sx={{ marginRight: "2rem", backgroundColor: "#e89701" }}
                size="small"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#e89701" }}
                size="small"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </div>
          </ul>
        </nav>
      </header>

      <Outlet />
    </div>
  );
};

export default AuthNav;
