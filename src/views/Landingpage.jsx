import Navbutton from "../components/Navbutton";
import { useNavigate } from "react-router-dom";
import styles from "../styles/landingpage.module.css";

import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

function LandingPage() {
  const navigate = useNavigate();
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    const fetchLastLogin = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLastLogin(data.lastLogin);
        }
      }
    };

    fetchLastLogin();
  }, []);

  // Denne funktion opdaterer login-tider i Firestore, kald den når brugeren logger ind
  const updateLoginTimes = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const now = Date.now();

    if (userSnap.exists()) {
      const data = userSnap.data();
      await updateDoc(userRef, {
        lastLogin: data.currentLogin || now,
        currentLogin: now,
      });
    } else {
      // Hvis bruger-dokumentet ikke findes endnu
      await setDoc(userRef, {
        lastLogin: now,
        currentLogin: now,
      });
    }
  };

  return (
    <div className={styles["landing-page"]}>
      <h1>Hej!</h1>
      <p>Velkommen til dit næste eventyr</p>
      <p>
        Du var sidst logget ind:{" "}
        {lastLogin ? new Date(lastLogin).toLocaleString("da-DK") : "Henter..."}
      </p>

    <div className={styles["button-landing"]}>
    <Navbutton
      title="Gå til Sofies Passage"
      className={styles.buttonone}
      onClick={() => navigate("/sofies-passage")}
    />
    <Navbutton
      title="Gå til Quiz"
      className={styles.buttontwo}
      onClick={() => navigate("/quiz")}
    />
    <Navbutton
      title="Gå til Opslag"
      className={styles.buttonthree}
      onClick={() => navigate("/opslag")}
    />
  </div>
    </div>
  );
}

export default LandingPage;