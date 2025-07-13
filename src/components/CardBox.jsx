import './CardBox.css';


function CardBox({cards, onChange, onClick}) {
    return(
        <>
            {cards.map((card, index) => (
                <div className="cardBoxContainer" key={index}> 

                    <img className='deleteButton' draggable="false" onClick={() => onClick(index)} src="/assets/delete.png" alt="Delete" />

                    <textarea value={card.term} onChange={(e) => onChange(index, 'term', e.target.value)} name="term" className="cardInputs setTermInput" placeholder="Term" />
                    
                    <textarea value={card.definition} onChange={(e) => onChange(index, 'definition', e.target.value)} name="definition" className="cardInputs setDefinitionInput" placeholder="Definition" />
                    
                </div>
            ))}
        </>
        
    )
}

export default CardBox;