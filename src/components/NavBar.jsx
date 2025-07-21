import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.leftNav}>
        <img
          className={`${styles.logo} ${styles.navBarItems}`}
          src="/assets/brain.png"
          alt="logo"
        />
        <h1 className={styles.navBarItems}>Quiz.it</h1>
      </div>

      <div className={styles.rightNav}>
        <img
          className={`${styles.mode} ${styles.navBarItems}`}
          src="/assets/moon.png"
          alt="light/dark mode"
        />
        <img
          className={`${styles.settings} ${styles.navBarItems}`}
          src="/assets/settings.png"
          alt="settings"
        />
      </div>
    </div>
  );
}

export default NavBar;
