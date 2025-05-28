import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./views/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import LogoutOnClose from "./components/LogoutOnClose";
import './styles/Header.css'; // Import your CSS file
import LandingPage from "./views/Landingpage";
import SofiesPassage from "./views/SofiesPassage";
import Quiz from "./views/Quiz";
import Dineopslag from "./views/Dineopslag";
import Opslag from "./views/Opslag";
import Lavpost from "./views/Lavpost"; 
import Tekst from "./views/Tekst";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },,
            {
                path: "/landingpage", // Definerer stien til "admin"-siden
                element: <ProtectedRoute element={<LandingPage/>} />, // Beskytter admin-siden ved at indpakke den i "ProtectedRoute"
            },  
            {
                path: "/sofies-passage",
                element: <ProtectedRoute element={<SofiesPassage />} />,
                
            },
            {
                path: "/quiz",
                element: <ProtectedRoute element={<Quiz/>} />,
            },
            {
                path: "/dineopslag",
                element: <ProtectedRoute element={<Dineopslag />} />,
            },
            {
                path: "/opslag",
                element: <Opslag/>,
            },
            {
                path: "/lavpost",  
                element: <Lavpost />,
            },
            {
                path: "/tekst",  
                element: <Tekst />,
            },
            

        ],
    },
]);

function App() {
    return (
        <>
            <LogoutOnClose />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
