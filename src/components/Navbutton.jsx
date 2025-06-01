import styles from "../styles/landingpage.module.css";

function Navbutton({ title, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`${styles["nav-button"]} ${className}`}
        >
            {title}
        </button>
    );
}

export default Navbutton;

