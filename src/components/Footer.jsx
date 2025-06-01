import logo from "../assets/img/gyldendallogo.png"; 
import styles from "../styles/footer.module.css"; 

function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={logo} alt="Gyldendal logo" />
        </footer>
    );
}

export default Footer;
