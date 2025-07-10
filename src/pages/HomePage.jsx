import "./HomePage.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const navigate = useNavigate();

    const goToCreateSet = () => {
        navigate("/CreateSet");
    }

    return(
        <div className="pageContainer">

            <NavBar/>

            <div className="contentContainer">
                <div className="content">

                    <SearchBar/>

                    <div className="cardContainer">
                        <h1>cards here</h1>
                    </div>

                    <div className="createSetButtonContainer">
                        <button onClick={goToCreateSet} className="createSetButton">
                            <img className="createSetButtonLogo" src="/assets/plus.png" alt="create set logo" />
                            <span className="createSetButtonText">Create a new set</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HomePage;
