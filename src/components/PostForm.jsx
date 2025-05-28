import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/dineopslag.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseUrl } from "../firebase"; // firebaseUrl til REST API
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbutton from "../components/Navbutton";

export default function PostForm({ post, savePost, onPostDeleted }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      console.log("Indlæser post til redigering:", post);
    }
  }, [post]);

  useEffect(() => {
    async function fetchRole() {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const fetchedRole = userSnap.data().role;
            setRole(fetchedRole);
            console.log("Brugerrolle hentet:", fetchedRole);
          } else {
            console.log("Ingen rolle fundet for bruger");
          }
        } catch (err) {
          console.error("Fejl ved hentning af rolle:", err);
        }
      }
    }
    fetchRole();
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();

    // Kun ejer må redigere et eksisterende opslag
    if (post && post.email !== user?.email && role !== "admin") {
      alert("Du kan kun redigere dine egne opslag.");
      return;
    }

    const formData = {
      title: title,
      email: user?.email,
      date: new Date().toISOString(),
      ...(post?.id && { id: post.id }),
    };

    console.log("Gemmer post:", formData);

    if (formData.title.trim()) {
      savePost(formData);
    } else {
      setErrorMessage("Udfyld feltet");
    }
  }

  async function handleDelete() {
    if (!post?.id) {
      console.warn("Ingen post ID til sletning");
      return;
    }

    const isOwnerOrAdmin = post?.email === user?.email || role === "admin";

    console.log(`Forsøger at slette post ID: ${post.id}`);
    console.log(`Bruger: ${user?.email}`);
    console.log(`Rettigheder: ${isOwnerOrAdmin ? "OK" : "Ikke tilladt"}`);

    if (isOwnerOrAdmin) {
      const confirmDelete = window.confirm("Er du sikker på, at du vil slette dette opslag?");
      if (!confirmDelete) {
        console.log("Sletning afbrudt af bruger");
        return;
      }

      try {
        const response = await fetch(`${firebaseUrl}/posts/${post.id}.json`, {
          method: "DELETE",
        });
        console.log("Svar fra delete fetch:", response);

        if (response.ok) {
          alert("Opslaget blev slettet.");
          if (typeof onPostDeleted === "function") {
            onPostDeleted(); // Opdater listen i parent-komponenten
          }
          navigate("/DineOpslag");
        } else {
          console.error("Sletning fejlede med status:", response.status);
          alert("Noget gik galt ved sletning.");
        }
      } catch (error) {
        console.error("Fejl ved sletning:", error);
        alert("Noget gik galt ved sletning.");
      }
    } else {
      alert("Du har ikke tilladelse til at slette dette opslag.");
      console.warn("Sletning afvist: manglende rettigheder");
    }
  }

  if (loading) return <div>Indlæser...</div>;
  if (error) return <div>Fejl: {error.message}</div>;

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit}>
        <label>
          Skriv en kommentar
          <input
            type="text"
            value={title}
            placeholder="Giv en kommentar"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <p className={styles.texterror}>{errorMessage}</p>
        <div className={styles.buttonWrapper}>
          {/* Kun vis gem, hvis ny post eller ejer */}
          {(!post || post.email === user?.email || role === "admin") && <Navbutton title="Gem" />}
          {/* Kun vis slet, hvis ejer eller admin */}
          {post?.id && (post.email === user?.email || role === "admin") && (
            <Navbutton
              title="Slet"
              className={styles.sletknap}
              onClick={handleDelete}
            />
          )}
        </div>
      </form>
    </div>
  );
}