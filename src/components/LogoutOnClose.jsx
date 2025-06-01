import { useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const LogoutOnClose = () => {
  useEffect(() => {
    let isReload = false;

    const handleBeforeUnload = (event) => {
      // Vi forsøger at registrere reload/navigation ved at sætte et flag i sessionStorage
      sessionStorage.setItem("isReload", "true");
    };

    const handleUnload = () => {
      // Tjek om vi har flag for reload/navigation
      isReload = sessionStorage.getItem("isReload") === "true";
      
      if (!isReload) {
        // Hvis ikke reload - altså formentlig lukning, så log ud
        signOut(auth).catch((error) => console.error("Logout fejlede:", error));
      } else {
        // Nulstil flagget, så det ikke forhindrer næste gang
        sessionStorage.removeItem("isReload");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return null;
};

export default LogoutOnClose;