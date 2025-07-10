import './SearchBar.css';

function SearchBar() {
    return (
        <div className="searchBarContainer">
            <div className="searchBar">
                <img className="searchLogo" src="/assets/magnifying-glass.png" alt="search logo" />
                <input placeholder="Type to search..." className="searchBarInput" type="text" />
            </div>
        </div>
    );
}

export default SearchBar;