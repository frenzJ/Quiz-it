import styles from "./FlashCard.module.css";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

function FlashCard() {
  const location = useLocation();

  const { set_id, cards } = location.state || {};
  console.log(cards);
  return (
    <>
      <NavBar />

      <div className={styles.flashCardContainer}>
        <p> 1 / 7 cards</p>
        <div className={styles.flashCardBox}>
          <h1 className={styles.termFlashCard}>Term</h1>
          <p className={styles.definitionFlashCard}>Definition</p>
        </div>
      </div>

      <div className={styles.flashCardChoiceContainer}>
        <button
          className={`${styles.flashCardChoice} ${styles.flashCardChoiceAgain}`}
        >
          {" "}
          <h1 className={styles.flashCardChoiceText}>Again</h1> <p>∞</p>{" "}
        </button>
        <button
          className={`${styles.flashCardChoice} ${styles.flashCardChoiceGood}`}
        >
          {" "}
          <h1 className={styles.flashCardChoiceText}>Good</h1> <p>+10mins</p>{" "}
        </button>
      </div>
    </>
  );
}

export default FlashCard;
