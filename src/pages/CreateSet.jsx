import "./CreateSet.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBox from "../components/CardBox";
import { useState, useEffect } from "react";

function CreateSet(){
        const [cardSet, setCardSet] = useState({set_name: "", description: ""});
    const [cards, setCards] = useState([{term: "", definition: ""},
                                        {term: "", definition: ""},
                                        {term: "", definition: ""}
                                        ]);


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

    const handleDeleteCard = (index) => {
        const filteredCard = cards.filter((_, i) => i !== index)
        setCards(filteredCard)
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

        const resSet = await fetch("http://localhost/Quiz-it/backend/sets/create.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardSet)
        });

        const responseSet = await resSet.json();
        console.log(responseSet.message);
        const set_id = responseSet.set_id;

        
        const promises = cards.map(card =>
            fetch("http://localhost/Quiz-it/backend/cards/create.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    set_id: set_id,
                    term: card.term,
                    definition: card.definition
                })
            })
        );

        await Promise.all(promises);

        setCardSet({set_name: "", description: ""})
        setCards([{term: "", definition: ""},
                    {term: "", definition: ""},
                    {term: "", definition: ""}
                ])
        console.log("All cards created");
    };




    return(
        <div className="pageContainer">

            <NavBar/>
            
            <form onSubmit={handleSubmit}> 
                <div className="contentContainer">
                    
                        <div className="createSetContainer"> 
                            <div className="SetName">
                                    <input autoComplete="off" value={cardSet.set_name} onChange={handleChangeSet} className="inputs setNameInput" name="set_name" type="text" placeholder="Set name" />
                            </div>

                            <div className="SetDescription">
                                    <textarea value={cardSet.description} onChange={handleChangeSet} className="inputs setDescriptionInput" name="description" placeholder="Set description" />
                            </div>
                        </div>

                        <SearchBar/>
                            
                        <CardBox cards={cards} onChange={handleChangeCard} onClick={handleDeleteCard}/>
                        
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