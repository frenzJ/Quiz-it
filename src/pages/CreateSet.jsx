import "./CreateSet.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBox from "../components/CardBox";
import { useState, useEffect } from "react";

function CreateSet(){
    const [cards, setCards] = useState([{term: "", definition: ""},
                                        {term: "", definition: ""},
                                        {term: "", definition: ""}
                                        ]);
    const [cardSet, setCardSet] = useState({set_name: "", description: ""});

    const handleAddCard = () => {
        setCards(prevCards => [...prevCards, {term: "", definition: ""}]);
    }

    function handleChangeSet(e){
        setCardSet({...cardSet, [e.target.name]: e.target.value})
    }

    const handleChangeCard = (index, field, value) => {
        const updatedCards = [...cards];
        updatedCards[index][field] = value;
        setCards(updatedCards);
    }


    useEffect(() => {
        if (cards.length > 3) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [cards]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost/Quiz-it/backend/sets/create.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cardSet)
        });

        const result = await res.json();
        console.log(result.message)

        await fetch("http://localhost/Quiz-it/backend/cards/create.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            set_id: result.set_id,
            cards: cards
        })
        });

        setCardSet({set_name: "", description: ""});
        setCards([{term: "", definition: ""}]);
        }



    return(
        <div className="pageContainer">

            <NavBar/>
            
            <form onSubmit={handleSubmit}> 
                <div className="contentContainer">
                    
                        <div className="createSetContainer"> 
                            <div className="SetName">
                                    <input value={cardSet.set_name} onChange={handleChangeSet} className="inputs setNameInput" name="set_name" type="text" placeholder="Set name" />
                            </div>

                            <div className="SetDescription">
                                    <textarea value={cardSet.description} onChange={handleChangeSet} className="inputs setDescriptionInput" name="description" placeholder="Set description" />
                            </div>
                        </div>

                        <SearchBar/>
                            
                        <CardBox cards={cards} onChange={handleChangeCard}/>
                        
                        <div>
                            <div className="addCardContainer">
                                <button type="button" onClick={handleAddCard} className="addButton addCardButton">
                                    <h2 className="addCardText">Add Card</h2>
                                </button>
                                <button type="submit" className="addButton doneCardButton">
                                    <h2 className="doneCardText">Done</h2>
                                </button>
                            </div>
                        </div>
                </div>
            </form>

        </div>
    )
}

export default CreateSet;