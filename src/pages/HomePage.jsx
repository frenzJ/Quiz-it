import "./HomePage.css";
import NavBar from "../components/NavBar";

function HomePage(){
    return(
        <div className="pageContainer">
            <NavBar/>
            <div className="contentContainer">
                <div className="searchBarContainer">
                    <img id="searchLogo" src="/assets/magnifying-glass.png" alt="" />
                    <input placeholder="Type to search..." id="searchBar" className="contentItem" type="text" />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default HomePage;
