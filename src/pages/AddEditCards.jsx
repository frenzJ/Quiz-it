import styles from "./AddEditCards.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxCreateSet from "../components/CardBoxCreateSet";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddEditCards() {
  const location = useLocation();
  const { set_id, set_name, description, cards } = location.state || {};
  
  const [cardSet, setCardSet] = useState({
    set_id: set_id,
    set_name: set_name,
    description: description,
  });
  const [newCards, setNewCards] = useState(cards);

  const navigate = useNavigate();

  const handleAddCard = () => {
    setNewCards((prevCards) => [
      ...prevCards,
      { card_id: "", term: "", definition: "" },
    ]);
  };

  function handleChangeSet(e) {
    setCardSet({ ...cardSet, [e.target.name]: e.target.value });
  }

  const handleChangeCard = (index, field, value) => {
    const updatedCards = [...newCards];
    updatedCards[index][field] = value;
    setNewCards(updatedCards);
  };

  const handleDeleteCard = (index) => {
    const filteredCard = newCards.filter((_, i) => i !== index);
    setNewCards(filteredCard);
  };

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [newCards.length]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const hasValidCard = newCards.some(
    (card) => card.term.trim() !== "" && card.definition.trim() !== ""
  );

  if (!hasValidCard) {
    console.error("No cards inserted");
    return;
  }

  try {
    const resUpdateSet = await fetch("http://localhost/Quiz-it/backend/sets/update.php", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        set_id: cardSet.set_id,
        set_name: cardSet.set_name,
        description: cardSet.description
      }),
    });
    const resultUpdateSet = await resUpdateSet.json();
    console.log(resultUpdateSet.message);

    const promises = newCards.map((card) => {
      const url = card.card_id
        ? "http://localhost/Quiz-it/backend/cards/update.php"
        : "http://localhost/Quiz-it/backend/cards/create.php";

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          set_id: cardSet.set_id,
          card_id: card.card_id,
          term: card.term,
          definition: card.definition,
        }),
      })
      .then(response => response.json())
      .then(data => console.log(data.message))
    });

    await Promise.all(promises);

    const deletedCards = cards.filter((oldCard) => {
      return !newCards.some(
        (newCard) => newCard.card_id && newCard.card_id === oldCard.card_id
      )
    })

    await fetch("http://localhost/Quiz-it/backend/cards/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(deletedCards)
    })

    navigate("/Card", {
      state: {
        set_id
      },
    });
  } catch (error) {
    console.error("Error submitting data:", error);
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
            cards={newCards}
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

export default AddEditCards;
