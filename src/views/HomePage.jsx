import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import figurfinish from "../assets/img/figurfinish.png"; // Import your image here
import styles from "../styles/adminpage.module.css"; // Import your CSS module

export default function HomePage() {
    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center", padding: "20px" }}>
            <div className={styles.figur}>
                <img src={figurfinish} alt="tegnet figur" />
            </div>
            <h2 className={styles.titleh2}>Velkommen til dit næste eventyr</h2>
            <LoginForm /> 
        </div>
    );
}
