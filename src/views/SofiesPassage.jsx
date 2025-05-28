import { useNavigate } from "react-router-dom";
import Navbutton from "../components/Navbutton";
import styles from "../styles/dineopslag.module.css"; // eller hvor din css er
import figurfinish from "../assets/img/figurreading.png"; // Import din figur her

function SofiesPassage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.sofietekst}>
        <h1>Velkommen til dit nye eventyr</h1>
        <h3>Filosofistaten</h3>
        <h3>Af Sofies Verden</h3>
      </div>
      <div className={styles.buttonWrapper}>
        <Navbutton
          title="Gå til tekst"
          className={styles.buttonsofie}
          onClick={() => navigate("/tekst")}
        />
      </div>
      <div className={styles.figur}>
        <img src={figurfinish} alt="tegnet figur" />
      </div>
    </>
  );
}

export default SofiesPassage;