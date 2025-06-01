import logo from "../assets/img/gyldendallogo.png"; // erstat med din sti
import styles from "../styles/footer.module.css"; // hvis du bruger CSS-moduler

function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={logo} alt="Gyldendal logo" />
        </footer>
    );
}

export default Footer;