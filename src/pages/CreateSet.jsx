import styles from "./CreateSet.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxCreateSet from "../components/CardBoxCreateSet";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateSet() {
  const [cardSet, setCardSet] = useState({ set_name: "", description: "" });
  const [cards, setCards] = useState([
    { term: "", definition: "" },
    { term: "", definition: "" },
    { term: "", definition: "" },
  ]);

  const navigate = useNavigate();

  const handleAddCard = () => {
    setCards((prevCards) => [...prevCards, { term: "", definition: "" }]);
  };

  function handleChangeSet(e) {
    setCardSet({ ...cardSet, [e.target.name]: e.target.value });
  }

  const handleChangeCard = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleDeleteCard = (index) => {
    const filteredCard = cards.filter((_, i) => i !== index);
    setCards(filteredCard);
  };

  useEffect(() => {
    if (cards.length > 3) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cards.length]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasValidCard = cards.some(
      (card) => card.term.trim() !== "" && card.definition.trim() !== ""
    );

    if (!hasValidCard) {
      console.error("No cards inserted");
      return;
    }

    try {
      const resSet = await fetch(
        "http://localhost/Quiz-it/backend/sets/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardSet),
        }
      );

      const responseSet = await resSet.json();
      const set_id = responseSet.set_id;

      const promises = cards.map((card) => {
        return fetch("http://localhost/Quiz-it/backend/cards/create.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            set_id: set_id,
            term: card.term,
            definition: card.definition,
          }),
        });
      });

      await Promise.all(promises);

      const noEmptyCards = cards.filter(
        (card) => card.term.trim() != "" && card.definition.trim() != ""
      );

      setCards();

      navigate("/Card", {
        state: {
          set_name: cardSet.set_name,
          description: cardSet.description,
          cards: noEmptyCards,
        },
      });

      setCardSet({ set_name: "", description: "" });
      setCards([
        { term: "", definition: "" },
        { term: "", definition: "" },
        { term: "", definition: "" },
      ]);
    } catch {
      console.error("Missing set value (fetching)");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />

      <BackButton page={"/"} />

      <form onSubmit={handleSubmit}>
        <div className={styles.contentContainer}>
          <div className={styles.createSetContainer}>
            <div className={styles.setName}>
              <input
                autoComplete="off"
                value={cardSet.set_name}
                onChange={handleChangeSet}
                className={`${styles.inputs} ${styles.setNameInput}`}
                name="set_name"
                type="text"
                placeholder="Set name"
              />
            </div>

            <div className={styles.setDescription}>
              <textarea
                value={cardSet.description}
                onChange={handleChangeSet}
                className={`${styles.inputs} ${styles.setDescriptionInput}`}
                name="description"
                placeholder="Set description"
              />
            </div>
          </div>

          <SearchBar />

          <CardBoxCreateSet
            cards={cards}
            onChange={handleChangeCard}
            onClick={handleDeleteCard}
          />

          <div>
            <div className={styles.addCardContainer}>
              <button
                type="button"
                onClick={handleAddCard}
                className={`${styles.addButton} ${styles.addCardButton}`}
              >
                <h2 className={styles.addCardText}>Add Card</h2>
              </button>
              <button
                type="submit"
                className={`${styles.addButton} ${styles.doneCardButton}`}
              >
                <h2 className={styles.doneCardText}>Done</h2>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateSet;
