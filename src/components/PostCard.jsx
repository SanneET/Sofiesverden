import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/dineopslag.module.css";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [role, setRole] = useState(null);

    useEffect(() => {
        async function fetchUserRole() {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setRole(userSnap.data().role);
                }
            }
        }
        fetchUserRole();
    }, [user]);

    function handleClick() {
        // Admin kan redigere alt, student kun egne opslag
        const isOwner = post.email === user?.email;
        const isAdmin = role === "admin";

        if (isAdmin || isOwner) {
            navigate("/Lavpost", { state: { post } });
        } else {
            alert("Du har ikke tilladelse til at redigere dette opslag.");
        }
    }

    return (
        <article onClick={handleClick} className={styles.cards}>
            <h2>{post.title}</h2>
            {post.date && (
                <p style={{ fontSize: "0.9rem", color: "white", marginTop: "0.5rem" }}>
                    {new Date(post.date).toLocaleDateString("da-DK", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            )}
        </article>
    );
}
