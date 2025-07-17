import styles from "./HomePage.module.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CardBoxDisplayHomepage from "../components/CardBoxDisplayHomepage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
	const [cards, setCards] = useState([{}]);
	const [totalCardsPerSet, setTotalCardsPerSet] = useState([]);
	const [showPopUp, setShowPopUp] = useState(false);
	const [itemToDeleteName, setItemToDeleteName] = useState("");

	const navigate = useNavigate();

	const goToCreateSet = () => {
		navigate("/CreateSet");
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetch("http://localhost/Quiz-it/backend/read_cards_set.php")
				.then((response) => response.json())
				.then((data) => {
					const arrayData = Object.keys(data.set).map((key) => ({
						set_name: key,
						...data.set[key],
					}));
					setCards(arrayData);
					setTotalCardsPerSet(data.totalCardsPerSet);
				})
				.catch((error) => console.error(error));
		};

		fetchData();
	}, []);

	function handleCLickDelete(set_name) {
		setItemToDeleteName(set_name);
		setShowPopUp(true);
		document.body.style.overflow = "hidden";
	}

	const confirmDelete = async () => {
		console.log(itemToDeleteName)
		try {
			await fetch("http://localhost/Quiz-it/backend/sets/delete.php", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ set_name: itemToDeleteName }),
			});
		} catch {
			console.log("problem in fetching set");
		}

		setShowPopUp(false);
		document.body.style.overflow = "auto";
	};

	function cancelDelete() {
		setShowPopUp(false);
		document.body.style.overflow = "auto";
	}

	return (
		<div className={styles.pageContainer}>
			<NavBar />

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<SearchBar />

					<div className={styles.cardContainer}>
						<CardBoxDisplayHomepage
							cards={cards}
							onClick={handleCLickDelete}
							totalCardsPerSet={totalCardsPerSet}
						/>
					</div>

					<div className={styles.createSetButtonContainer}>
						<button onClick={goToCreateSet} className={styles.createSetButton}>
							<img
								className={styles.createSetButtonLogo}
								src="/assets/plus.png"
								alt="create set logo"
							/>
							<span className={styles.createSetButtonText}>
								Create a new set
							</span>
						</button>
					</div>

					{showPopUp && (
						<div className={styles.deletePopupContainer}>
							<div className={styles.deletePopupBox}>
								<h1 className={styles.deleteSetText1}>Delete Set</h1>
								<p className={styles.deleteSetText2}>
									Are you sure you want to delete "{itemToDeleteName}"? <br /> This
									action cannot be undone.
								</p>
								<div>
									<button className={`${styles.deleteButton} ${styles.cancelDeleteButton}`} onClick={cancelDelete}>Cancel</button>
									<button className={`${styles.deleteButton} ${styles.deleteSetButton}`} onClick={confirmDelete}>Delete</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default HomePage;
