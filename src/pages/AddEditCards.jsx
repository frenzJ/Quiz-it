import styles from "./AddEditCards.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxInputs from "../components/CardBoxInputs";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddEditCards() {
  // Retrieve passed data from the previous page (set info and existing cards)
  const location = useLocation();
  const { set_id, set_name, description, cards } = location.state || {};

  // Local state for set info
  const [cardSet, setCardSet] = useState({
    set_id: set_id,
    set_name: set_name,
    description: description,
  });

  // Local state for all editable/added cards
  const [newCards, setNewCards] = useState(cards);

  const navigate = useNavigate();

  /**
   * Adds a new empty card to the list.
   */
  const handleAddCard = () => {
    setNewCards((prevCards) => [
      ...prevCards,
      { card_id: "", term: "", definition: "" },
    ]);
  };

  /**
   * Handles changes to the set name or description.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Input or textarea change event.
   */
  function handleChangeSet(e) {
    setCardSet({ ...cardSet, [e.target.name]: e.target.value });
  }

  /**
   * Updates a specific field (term or definition) of a card at the given index.
   * @param {number} index - Index of the card in the list.
   * @param {"term" | "definition"} field - Field name to update.
   * @param {string} value - New value for the field.
   */
  const handleChangeCard = (index, field, value) => {
    const updatedCards = [...newCards];
    updatedCards[index][field] = value;
    setNewCards(updatedCards);
  };

  /**
   * Deletes a card from the list by index.
   * @param {number} index - Index of the card to delete.
   */
  const handleDeleteCard = (index) => {
    const filteredCard = newCards.filter((_, i) => i !== index);
    setNewCards(filteredCard);
  };

  // Scroll to bottom when a new card is added
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [newCards.length]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  /**
   * Submits the updated set and cards data to the backend.
   * - Updates set metadata.
   * - Updates or creates cards.
   * - Identifies and deletes removed cards.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure at least one card is valid before submitting
    const hasValidCard = newCards.some(
      (card) => card.term.trim() !== "" && card.definition.trim() !== ""
    );

    if (!hasValidCard) {
      console.error("No cards inserted");
      return;
    }

    try {
      // Update set metadata (name, description)
      const resUpdateSet = await fetch(
        "http://localhost/Quiz-it/backend/sets/update.php",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            set_id: cardSet.set_id,
            set_name: cardSet.set_name,
            description: cardSet.description,
          }),
        }
      );

      const resultUpdateSet = await resUpdateSet.json();
      console.log(resultUpdateSet.message);

      // For each card: update if existing, or create if new
      const cardUpdatePromises = newCards.map(async (card) => {
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
          .then((response) => response.json())
          .then((data) => console.log(data.message));
      });

      await Promise.all(cardUpdatePromises);

      // Identify and send cards that were deleted (present before, now missing)
      const deletedCards = cards.filter((oldCard) => {
        return !newCards.some(
          (newCard) => newCard.card_id && newCard.card_id === oldCard.card_id
        );
      });

      const cardDeletePromises = deletedCards.map(
        async (card) =>
          await fetch(
            "http://localhost/Quiz-it/backend/cards/specific_delete.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(card),
            }
          )
      );

      await Promise.all(cardDeletePromises);

      // Navigate back to set view page
      navigate("/Card", {
        state: {
          set_id,
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
            {/* Set name input */}
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

            {/* Set description input */}
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

          {/* Search bar (not essential for submission) */}
          <SearchBar />

          {/* Card input boxes */}
          <CardBoxInputs
            cards={newCards}
            onChange={handleChangeCard}
            onClick={handleDeleteCard}
          />

          {/* Action buttons */}
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
