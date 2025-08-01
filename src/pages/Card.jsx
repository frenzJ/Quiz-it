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
  const [cardSet, setCardSet] = useState({})
  const [cards, setCards] = useState([])
  

  const { set_id } = location.state || {};

  const fetchData = async () => {
    try {
      const responseSet = await fetch("http://localhost/Quiz-it/backend/sets/read.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({set_id}),
      });

      const resultCardSet = await responseSet.json();
      setCardSet(resultCardSet)
    } catch {
      console.error("Problem in fetching set (set_id)")
    }

    try {
      const responseCard = await fetch("http://localhost/Quiz-it/backend/cards/read.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({set_id}),
      });

      const dataCard = await responseCard.json();
      setCards(dataCard.cards)
    } catch {
      console.error("Problem in fetching card (set_id)")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const GoToAddEditCards = () => {
    navigate("/AddEditCards", {
      state: {
        set_id: cardSet.set_id,
        set_name: cardSet.set_name,
        description: cardSet.description,
        cards
      }
    });
  };

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

      <SearchBar />

      <div className={styles.cardsContainer}>
        <CardBoxDisplayCards cards={cards} />
      </div>
    </>
  );
}

export default Card;
