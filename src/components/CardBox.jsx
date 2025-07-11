import './CardBox.css';


function CardBox({cards, onChange}) {
    return(
        <>
            {cards.map((card, index) => (
                <div className="cardBoxContainer" key={index}> 
                    <div className="SetTerm">
                        <textarea value={card.term} onChange={(e) => onChange(index, 'term', e.target.value)} name="term" className="cardInputs setTermInput" placeholder="Term" />
                    </div>

                    <div className="Setdefinition">
                        <textarea value={card.definition} onChange={(e) => onChange(index, 'description', e.target.value)} name="definition" className="cardInputs setDefinitionInput" placeholder="Definition" />
                    </div>
                </div>
            ))}
        </>
        
    )
}

export default CardBox;