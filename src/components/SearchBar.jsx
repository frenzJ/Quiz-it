import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <img
          className={styles.searchLogo}
          src="/assets/magnifying-glass.png"
          alt="search logo"
        />
        <input
          placeholder="Type to search..."
          className={styles.searchBarInput}
          type="text"
        />
      </div>
    </div>
  );
}

export default SearchBar;
