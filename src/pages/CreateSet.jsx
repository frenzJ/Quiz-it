import "./CreateSet.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBox from "../components/CardBox";
import { useState, useEffect } from "react";

function CreateSet(){
    const [numberOfCards, setNumberOfCards] = useState([]);
    

    const handleAddCard = () => {
        setNumberOfCards(cards => [...cards, `card${cards.length + 1}`]);
    }

    useEffect(() => {
        if (numberOfCards.length > 0) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [numberOfCards]);

    

    return(
        <div className="pageContainer">

            <NavBar/>

            <div className="contentContainer">
                <div className="content">

                    
                    </div>

                    <div className="createSetContainer"> 
                        <div className="SetName">
                            <input className="inputs setNameInput" type="text" placeholder="Set name" />
                        </div>

                        <div className="SetDescription">
                            <textarea className="inputs setDescriptionInput" placeholder="Set description" />
                        </div>
                    </div>

                    <SearchBar/>

                    <div className="cardBoxContainer"> 
                        <div className="SetName">
                            <textarea className="cardInputs setTermInput" placeholder="Term" />
                        </div>

                        <div className="SetDescription">
                            <textarea className="cardInputs setDefinitionInput" placeholder="Definition" />
                        </div>
                    </div>

                    <div>
                        
                        <CardBox numberOfCards={numberOfCards} />
                    
                    <div>
                        <div className="addCardContainer">
                            <button onClick={handleAddCard} className="addButton addCardButton">
                                <h2 className="addCardText">Add Card</h2>
                            </button>
                            <button className="addButton doneCardButton">
                                <h2 className="doneCardText">Done</h2>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CreateSet;