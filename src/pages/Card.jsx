import styles from "./Card.module.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import CardBoxDisplayCards from "../components/CardBoxDisplayCards";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/BackButton";

function Card() {
  const location = useLocation();
  const { set_name, description, cards } = location.state || {};
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <>
      <NavBar />
      <BackButton page={"/"} />
      <div className={styles.setNameBox}>
        <h1>{set_name}</h1>
        <p>{description}</p>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.studyButton}>Study</button>
        <button className={styles.addEditButton}>Add/Edit Cards</button>
      </div>

      <SearchBar />

      <div className={styles.cardsContainer}>
        <CardBoxDisplayCards cards={cards} />
      </div>
    </>
  );
}

export default Card;
