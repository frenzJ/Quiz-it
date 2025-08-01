import styles from "./BackButton.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BackButton({ page }) {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(page);
  };

  return (
    <img
      onClick={goToPage}
      className={styles.backButton}
      src="/assets/left-arrow.png"
      alt="Back Button"
    />
  );
}

BackButton.propTypes = {
  page: PropTypes.string,
};

export default BackButton;
