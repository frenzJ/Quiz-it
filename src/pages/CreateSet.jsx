import styles from "./CreateSet.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxInputs from "../components/CardBoxInputs";
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

  /**
   * Adds an empty card object to the list of cards.
   */
  const handleAddCard = () => {
    setCards((prevCards) => [...prevCards, { card_id: "", term: "", definition: "" }]);
  };

  /**
   * Handles changes to the set name or description.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  function handleChangeSet(e) {
    setCardSet({ ...cardSet, [e.target.name]: e.target.value });
  }

  /**
   * Handles changes to a specific card's term or definition.
   * @param {number} index - Index of the card being updated.
   * @param {"term" | "definition"} field - Field to update.
   * @param {string} value - New value to apply.
   */
  const handleChangeCard = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  /**
   * Removes a card at the specified index from the card list.
   * @param {number} index - Index of the card to remove.
   */
  const handleDeleteCard = (index) => {
    const filteredCard = cards.filter((_, i) => i !== index);
    setCards(filteredCard);
  };

  // Scroll to bottom when more than 3 cards exist (assumes cards are added)
  useEffect(() => {
    if (cards.length > 3) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cards.length]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  /**
   * Submits the new set and its cards to the backend.
   * - Creates the set.
   * - Creates each card that has valid content.
   * - Navigates to the Card view page after creation.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event.
   */
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
        (card) => card.term.trim() !== "" && card.definition.trim() !== ""
      );

      // Navigate to the Card page
      navigate("/Card", {
        state: {
          set_id: set_id,
          set_name: cardSet.set_name,
          description: cardSet.description,
          cards: noEmptyCards,
        },
      });

      // Reset form
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

          <CardBoxInputs
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