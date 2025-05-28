import { useState, useEffect } from "react";
import { firebaseUrl } from "../firebase";
import PostCard from "../components/PostCard";
import styles from "../styles/dineopslag.module.css";
import figurfinish from "../assets/img/figuropslag.png";

export default function Opslag() {
    const [posts, setPosts] = useState([]);
    const [refreshToggle, setRefreshToggle] = useState(false); // ny state til at trigge reload

    useEffect(() => {
        async function getPosts() {
            const url = `${firebaseUrl}/posts.json`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data) {
                setPosts([]);
                return;
            }
            const postsArray = Object.keys(data)
                .map(key => ({ id: key, ...data[key] }))
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(postsArray);
        }
        getPosts();
    }, [refreshToggle]); // kør useEffect igen, når refreshToggle skifter

    // Funktion du kan kalde for at opdatere listen:
    function refreshPosts() {
        setRefreshToggle(!refreshToggle);
    }

    return (
        <section className={styles.page}>
            <div className={styles.figuropslag}>
                <img src={figurfinish} alt="tegnet figur" />
            </div>
            <h1>Alle opslag</h1>
            {posts.length > 0 ? (
                <section className={styles.gridcontainer}>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} refreshPosts={refreshPosts} />
                    ))}
                </section>
            ) : (
                <p>Der er ingen opslag endnu.</p>
            )}
        </section>
    );
}