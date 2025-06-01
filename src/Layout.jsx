import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./styles/layout.css"; // opret denne fil

function Layout() {
    return (
        <div className="layout-wrapper">
            <Nav />
            <main className="layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;