import styles from "./CardBoxDisplayCards.module.css";
import PropTypes from "prop-types";

function CardBoxDisplayCards({ cards = [] }) {
  return (
    <>
      {cards.map((card, index) => (
        <div key={index} className={styles.cardBox}>
          <h1>{card.term}</h1>
          <p>{card.definition}</p>
        </div>
      ))}
    </>
  );
}

CardBoxDisplayCards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string,
      definition: PropTypes.string,
    })
  ),
};

export default CardBoxDisplayCards;
