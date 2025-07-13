import './CardBoxDisplay.css';

function CardBoxDisplay(){
    return(
        <div className='cardBox'>
            <img className='deleteButtonDisplay' src="/assets/delete1.png"  />
            <h1 className='cardName'>Name</h1>
            <h1 className='cardDescription'>Description</h1>
            <hr />
            <div className='footerCardContainer'>
                <p className='footerCard date'>Date created </p>
                <div className='footerSubCardContainer'>
                    <img className='cardLayerLogo' src="/assets/layer.png" alt="" />
                    <p className='footerCard numberOfCards'>8 cards</p>
                </div>
            </div>
        </div>
    )
}

export default CardBoxDisplay;