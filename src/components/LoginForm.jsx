import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/loginform.css"; 
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let userEmail = sessionStorage.getItem("email");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      sessionStorage.setItem("email", username);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const now = Date.now();

      // Tildel rolle baseret på email
      const isAdmin = username === "test@testadmin.dk"; 
      const userRole = isAdmin ? "admin" : "student";

      if (userSnap.exists()) {
        const data = userSnap.data();
        await updateDoc(userRef, {
          lastLogin: data.currentLogin || now,
          currentLogin: now,
        });
      } else {
        await setDoc(userRef, {
          lastLogin: now,
          currentLogin: now,
          role: userRole, 
        });
      }

      console.log("Login successful!", username);
      navigate("/landingpage");
    } catch (err) {
      setError("Fejl ved login: " + err.message);
    }
  };

  return (
    <div className="logon-container">
      <form className="logon-form" onSubmit={handleSubmit}>
        <h2 className="logon-heading">Log ind her for at få adgang</h2>

        <img
          className="logon-icon"
          src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>'
          alt="Login illustration"
        />

        {userEmail && <p className="logon-success">Du er allerede logget ind som {userEmail}!</p>}
        {error && <p className="logon-error">{error}</p>}

        <label className="logon-label">
          Brugernavn:
          <input
            className="logon-input"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="logon-label">
          Adgangskode:
          <input
            className="logon-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="button-container">
          <button type="submit" className="logon-button">Log ind</button>
        </div>
      </form>
    </div>
  );
};
