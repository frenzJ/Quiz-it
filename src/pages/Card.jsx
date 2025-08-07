import styles from "./Card.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import CardBoxDisplayCards from "../components/CardBoxDisplayCards";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/BackButton";

function Card() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cardSet, setCardSet] = useState({});
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const { set_id } = location.state || {};

  /**
   * Fetches set information and its associated cards from the backend.
   */
  const fetchData = async () => {
    try {
      const responseSet = await fetch(
        "http://localhost/Quiz-it/backend/sets/read.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ set_id }),
        }
      );

      const resultCardSet = await responseSet.json();
      setCardSet(resultCardSet);
      console.log(resultCardSet.message);
    } catch {
      console.error("Problem in fetching set (set_id)");
    }

    try {
      const responseCard = await fetch(
        "http://localhost/Quiz-it/backend/cards/read.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ set_id }),
        }
      );

      const dataCard = await responseCard.json();
      setCards(dataCard.cards);
      console.log(dataCard.message);
    } catch {
      console.error("Problem in fetching card (set_id)");
    }
  };

  //Filter cards
  const filteredCards = cards.filter(card => {
    if(activeTab === "all"){
      return card
    } else if (activeTab === "memorized") {
      return card.memorize === 1
    } else if (activeTab === "not memorize") {
      return card.memorize === 0
    }
  })

  const totalCards = cards.length;
  const totalMemorizedCards = cards.filter(card => {return card.memorize === 1}).length;
  const totalNotMemorizedCards = cards.filter(card => {return card.memorize === 0}).length;

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Navigates to the AddEditCards page with current set and card data.
   */
  const GoToAddEditCards = () => {
    navigate("/AddEditCards", {
      state: {
        set_id: cardSet.set_id,
        set_name: cardSet.set_name,
        description: cardSet.description,
        cards,
      },
    });
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <NavBar />
      <BackButton page={"/"} />
      <div className={styles.setNameBox}>
        <h1 className={styles.setNameText}>{cardSet.set_name}</h1>
        <hr />
        <p className={styles.setDescriptionBox}>{cardSet.description}</p>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.studyButton}>Study</button>
        <button onClick={GoToAddEditCards} className={styles.addEditButton}>
          Add/Edit Cards
        </button>
      </div>

      <div className={styles.cardBar}>
        <button
          onClick={() => {
            setActiveTab("all")}
          }
          className={`${styles.cardStatus} ${
            activeTab === "all" ? styles.active : ""
          }`}
        >
          All ({totalCards})
        </button>
        <button
          onClick={() => setActiveTab("memorized")}
          className={`${styles.cardStatus} ${
            activeTab === "memorized" ? styles.active : ""
          }`}
        >
          Memorized ({totalMemorizedCards})
        </button>
        <button
          onClick={() => setActiveTab("not memorize")}
          className={`${styles.cardStatus} ${
            activeTab === "not memorize" ? styles.active : ""
          }`}
        >
          Not Memorized ({totalNotMemorizedCards})
        </button>
      </div>

      <SearchBar />

      <div className={styles.cardsContainer}>
        <CardBoxDisplayCards cards={filteredCards} />
      </div>
    </>
  );
}

export default Card;
