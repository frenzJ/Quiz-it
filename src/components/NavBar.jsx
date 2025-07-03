import "./NavBar.css"

function NavBar(){
    return(
        <>
            <div className="navBar">
                <div className="leftNav">
                    <img id="logo" className="navBarItems" src="/assets/brain.png" alt="logo" />
                    <h1 className="navBarItems">Quiz.it</h1>
                </div>
                
                <div className="rightNav">
                    <img id="mode" className="navBarItems" src="/assets/moon.png" alt="light/dark mode" />
                    <img id="settings" className="navBarItems" src="/assets/settings.png" alt="settings" />
                </div>
            </div>
        </>
    )
}

export default NavBar;
