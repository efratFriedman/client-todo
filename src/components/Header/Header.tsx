import { Moon, Sun, LayoutDashboard } from "lucide-react";
import styles from "./Header.module.scss";
import { useUiStore } from "../../stores/uiStore";

const Header = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoBox}>
          <LayoutDashboard size={24} />
        </div>
        <h1 className={styles.title}>SyncTask</h1>
      </div>

      <button
        onClick={toggleTheme}
        className={styles.themeButton}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
};

export default Header;