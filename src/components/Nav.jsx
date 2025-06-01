import { Link } from "react-router-dom";
import { useState } from "react";
import logoIcon from "../assets/img/gyldendallogo.png";
import "../styles/Header.css"; // Import your CSS file

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo-link">
                    <img
                        src={logoIcon}
                        alt="Gyldendal logo"
                        style={{ height: "10vh" }}
                        className="logo-img"
                    />
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    className="burger-button"
                >
                    <svg viewBox="0 0 100 80" width="20" height="20" fill="white">
                        <rect width="100" height="15"></rect>
                        <rect y="30" width="100" height="15"></rect>
                        <rect y="60" width="100" height="15"></rect>
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <>
                    <nav className="dropdown-menu">
                        <Link to="/" onClick={handleLinkClick}>Log ind</Link>
                        <Link to="/landingpage" onClick={handleLinkClick}>Forside</Link>
                        <Link to="/sofies-passage" onClick={handleLinkClick}>Sofies passage</Link>
                        <Link to="/quiz" onClick={handleLinkClick}>Quiz</Link>
                        <Link to="/dineopslag" onClick={handleLinkClick}>Dine opslag</Link>
                        <Link to="/opslag" onClick={handleLinkClick}>Opslag</Link>
                    </nav>

                    <div
                        className="overlay"
                        onClick={() => setMenuOpen(false)}
                    />
                </>
            )}
        </header>
    );
}