import styles from './CardBoxDisplayHomepage.module.css';
import PropTypes from 'prop-types';

function CardBoxDisplayHomepage({cards = [], totalCardsPerSet = [], onClick }) {
    return (
        <>
            {cards.map((card, index) => (
                <div className={styles.cardBox} key={index}>
                    <img
                        onClick={() => onClick({ set_id: card.set_id, set_name: card.set_name })}
                        className={styles.deleteButtonDisplay}
                        src="/assets/delete1.png"
                        alt="Delete"
                    />
                    <h1 className={styles.cardName}>{card.set_name}</h1>
                    <h1 className={styles.cardDescription}>{card.description}</h1>
                    <hr />
                    <div className={styles.footerCardContainer}>
                        <p className={`${styles.footerCard} ${styles.date}`}>
                            Date created: {card.set_date}
                        </p>
                        <div className={styles.footerSubCardContainer}>
                            <img className={styles.cardLayerLogo} src="/assets/layer.png" alt="Layers" />
                            <p className={`${styles.footerCard} ${styles.numberOfCards}`}>
                                {totalCardsPerSet[index]}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

CardBoxDisplayHomepage.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            set_id: PropTypes.number,
            set_name: PropTypes.string,
            description: PropTypes.string,
            set_date: PropTypes.string,
        })
    ),
    totalCardsPerSet: PropTypes.arrayOf(PropTypes.number),
    onClick: PropTypes.func,
};

export default CardBoxDisplayHomepage;
