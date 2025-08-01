import styles from "./HomePage.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxDisplayHomepage from "../components/CardBoxDisplayHomepage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [cards, setCards] = useState([]);
  const [totalCardsPerSet, setTotalCardsPerSet] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState("");
  const [itemToDeleteName, setItemToDeleteName] = useState("");

  const navigate = useNavigate();

  const goToCreateSet = () => {
    navigate("/CreateSet");
  };

  const handleNavigateSet = (card) => {
    navigate("/Card", {
      state: card,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost/Quiz-it/backend/read_cards_set.php"
      );
      const data = await response.json();

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

  useEffect(() => {
    fetchData();
  }, []);

  function handleClickDelete({ set_id, set_name }) {
    setItemToDeleteId(set_id);
    setItemToDeleteName(set_name);
    setShowPopUp(true);
    document.body.style.overflow = "hidden";
  }

  const confirmDelete = async () => {
    try {
      const resDelete = await fetch(
        "http://localhost/Quiz-it/backend/sets/delete.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ set_id: itemToDeleteId }),
        }
      );

      const responseDelete = await resDelete.json();
      console.log(responseDelete.message);
    } catch (error) {
      console.error("Problem in fetching set:", error);
    }

    if (cards.length === 1) {
      setCards([]);
    } else {
      await fetchData();
    }

    setShowPopUp(false);
    document.body.style.overflow = "auto";
  };

  function cancelDelete() {
    setShowPopUp(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className={styles.pageContainer}>
      <NavBar />

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <SearchBar />

          <div className={styles.cardContainer}>
            <CardBoxDisplayHomepage
              navigate={handleNavigateSet}
              cards={cards}
              onClick={handleClickDelete}
              totalCardsPerSet={totalCardsPerSet}
            />
          </div>

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

          {showPopUp && (
            <div className={styles.deletePopupContainer}>
              <div className={styles.deletePopupBox}>
                <h1 className={styles.deleteSetText1}>Delete Set</h1>
                <p className={styles.deleteSetText2}>
                  Are you sure you want to delete "{itemToDeleteName.substring(0, 40)}"? <br />
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
