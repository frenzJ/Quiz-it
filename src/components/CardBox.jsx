import styles from './CardBox.module.css';

function CardBox({ cards, onChange, onClick }) {
    return (
        <>
            {cards.map((card, index) => (
                <div className={styles.cardBoxContainer} key={index}> 

                    <img 
                        className={styles.deleteButton}
                        draggable="false" 
                        onClick={() => onClick(index)} 
                        src="/assets/delete.png" 
                        alt="Delete" 
                    />

                    <textarea 
                        value={card.term} 
                        onChange={(e) => onChange(index, 'term', e.target.value)} 
                        name="term" 
                        className={`${styles.cardInputs} ${styles.setTermInput}`} 
                        placeholder="Term" 
                    />

                    <textarea 
                        value={card.definition} 
                        onChange={(e) => onChange(index, 'definition', e.target.value)} 
                        name="definition" 
                        className={`${styles.cardInputs} ${styles.setDefinitionInput}`} 
                        placeholder="Definition" 
                    />
                </div>
            ))}
        </>
    );
}

export default CardBox;
