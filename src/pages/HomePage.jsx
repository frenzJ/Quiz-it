import styles from "./HomePage.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxDisplayHomepage from "../components/CardBoxDisplayHomepage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // State for all card sets
  const [cards, setCards] = useState([]);

  // Stores total cards per set (e.g., [1, 2, 3, 4, 5...])
  const [totalCardsPerSet, setTotalCardsPerSet] = useState([]);

  // Popup control for delete confirmation
  const [showPopUp, setShowPopUp] = useState(false);

  // Stores ID and name of the set to be deleted
  const [itemToDeleteId, setItemToDeleteId] = useState("");
  const [itemToDeleteName, setItemToDeleteName] = useState("");

  const navigate = useNavigate();

  /**
   * Navigates to the Create Set page
   */
  const goToCreateSet = () => {
    navigate("/CreateSet");
  };

  /**
   * Navigates to the Card view page for a selected set
   * @param {Object} card - The set object to navigate with
   */
  const handleNavigateSet = (card) => {
    navigate("/Card", {
      state: card,
    });
  };

  /**
   * Fetches all card sets and total cards per set from the backend
   */
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost/Quiz-it/backend/read_cards_set.php"
      );
      const data = await response.json();

      // Convert the object into an array for rendering
      const arrayData = Object.keys(data.set).map((key) => ({
        set_name: key,
        ...data.set[key],
      }));

      setCards(arrayData);
      setTotalCardsPerSet(data.totalCardsPerSet);
    } catch (error) {
      console.error(error);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Triggers the delete confirmation popup
   * @param {Object} param0
   * @param {string} param0.set_id - ID of the set to delete
   * @param {string} param0.set_name - Name of the set to show in popup
   */
  function handleClickDelete({ set_id, set_name }) {
    setItemToDeleteId(set_id);
    setItemToDeleteName(set_name);
    setShowPopUp(true);
  }

  /**
   * Deletes a set and its associated cards, then refreshes the data
   */
  const confirmDelete = async () => {
    try {
      // Delete all cards inside the set
      const resDeleteCard = await fetch(
        "http://localhost/Quiz-it/backend/cards/multiple_delete.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ set_id: itemToDeleteId }),
        }
      );
      const responseDeleteCard = await resDeleteCard.json();
      console.log(responseDeleteCard.message);

      // Delete the set itself
      const resDeleteSet = await fetch(
        "http://localhost/Quiz-it/backend/sets/delete.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ set_id: itemToDeleteId }),
        }
      );
      const responseDeleteSet = await resDeleteSet.json();
      console.log(responseDeleteSet.message);
    } catch (error) {
      console.error("Problem in fetching set:", error);
    }

    // If only one set existed, clear state, else re-fetch
    if (cards.length === 1) {
      setCards([]);
    } else {
      await fetchData();
    }

    // Close popup and restore scrolling
    setShowPopUp(false);
  };

  /**
   * Cancels delete popup
   */
  function cancelDelete() {
    setShowPopUp(false);
  }

  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = showPopUp ? "hidden" : "auto";
  }, [showPopUp]);

  return (
    <div className={styles.pageContainer}>
      <NavBar />

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <SearchBar />

          {/* Card sets display */}
          <div className={styles.cardContainer}>
            <CardBoxDisplayHomepage
              navigate={handleNavigateSet}
              cards={cards}
              onClick={handleClickDelete}
              totalCardsPerSet={totalCardsPerSet}
            />
          </div>

          {/* Create new set button */}
          <div className={styles.createSetButtonContainer}>
            <button onClick={goToCreateSet} className={styles.createSetButton}>
              <img
                className={styles.createSetButtonLogo}
                src="/assets/plus.png"
                alt="create set logo"
              />
              <span className={styles.createSetButtonText}>
                Create a new set
              </span>
            </button>
          </div>

          {/* Delete confirmation popup */}
          {showPopUp && (
            <div className={styles.deletePopupContainer}>
              <div className={styles.deletePopupBox}>
                <h1 className={styles.deleteSetText1}>Delete Set</h1>
                <p className={styles.deleteSetText2}>
                  Are you sure you want to delete "
                  {itemToDeleteName.substring(0, 40)}"? <br />
                  This action cannot be undone.
                </p>
                <div>
                  <button
                    className={`${styles.deleteButtons} ${styles.cancelDeleteButton}`}
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${styles.deleteButtons} ${styles.deleteSetButton}`}
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
