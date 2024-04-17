import { NavLink, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom/dist";

const UserMenu = () => {
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
            <li className={styles.navItem}>
              <NavLink
                end
                to="contact"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
              >
                Contact
              </NavLink>
            </li>
            <div>
              <Button
                // color="red[500]"
                variant="contained"
                type="submit"
                sx={{ marginRight: "2rem", backgroundColor: "#e89701" }}
                size="small"
                onClick={() => navigate("/logout")}
              >
                Log Out
              </Button>
            </div>
          </ul>
        </nav>
      </header>

      <Outlet />
    </div>
  );
};

export default UserMenu;
