import './CardBox.css';


function CardBox({numberOfCards}){
    return(
        <>
            {numberOfCards.map((cardId) => (
                <div className="cardBoxContainer" key={cardId}> 
                    <div id={numberOfCards} className="SetName">
                        <textarea className="cardInputs setTermInput" placeholder="Term" />
                    </div>

                    <div id={numberOfCards} className="SetDescription">
                        <textarea className="cardInputs setDefinitionInput" placeholder="Definition" />
                    </div>
                </div>
            ))}
        </>
        
    )
}

export default CardBox;