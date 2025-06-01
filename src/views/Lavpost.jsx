import { useNavigate, useLocation } from "react-router-dom";
import PostForm from "../components/PostForm";
import { firebaseUrl } from "../firebase";
import styles from "../styles/dineopslag.module.css";

export default function CreatePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.post;

    // Hvis der ikke er en post, laver vi en ny (POST)
    async function savePost(postData) {
        if (post?.id) {
            // REDIGER eksisterende post med PUT
            const response = await fetch(`${firebaseUrl}/posts/${post.id}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                navigate("/opslag");
            } else {
                console.log("Noget gik galt under opdatering.");
            }
        } else {
            // OPRET ny post med POST
            const response = await fetch(`${firebaseUrl}/posts.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                navigate("/opslag");
            } else {
                console.log("Noget gik galt under oprettelse.");
            }
        }
    }

    return (
        <section className={styles.page}>
            <h1>{post ? "Rediger dit opslag" : "Skriv en kommentar til opslagstavlen!"}</h1>
            <PostForm post={post} savePost={savePost} />
        </section>
    );
}