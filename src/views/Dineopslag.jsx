import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import Navbutton from "../components/Navbutton"; // Tilføj din Navbutton import her
import { firebaseUrl } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom"; // Til navigation
import styles from "../styles/dineopslag.module.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // Funktion til at hente opslag
  async function fetchPosts() {
    if (!user) return; // undgå kald hvis user ikke er klar endnu
    const url = `${firebaseUrl}/posts.json`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      setPosts([]);
      return;
    }
    const postsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    const personligePosts = postsArray.filter((post) => post.email === user.email);
    setPosts(personligePosts);
  }

  // Hent posts ved mount / user ændring
  useEffect(() => {
    fetchPosts();
  }, [user]);

  // Callback til at opdatere listen efter sletning
  function handlePostDeleted() {
    fetchPosts();
  }

  function handleAddPostClick() {
    navigate("/Lavpost"); // Ruten til siden, hvor man opretter nyt post
  }

  if (loading) return <div>Indlæser...</div>;
  if (error) return <div>Fejl: {error.message}</div>;

  return (
    <>
      <section className={styles.page}>
        <div className={styles.topbar}>
          <Navbutton title="Lav nyt post" onClick={handleAddPostClick} />
        </div>

        <div className={styles.postsContainer}>
          {posts.length > 0 ? (
            <section className={styles.gridcontainer}>
              {posts.map((post) => (
                <PostCard
                  post={post}
                  key={post.id}
                  // Send callback som prop, hvis PostCard eller PostForm skal bruge den
                  onPostDeleted={handlePostDeleted}
                />
              ))}
            </section>
          ) : (
            <p>Nothing to show</p>
          )}
        </div>
      </section>
    </>
  );
}
