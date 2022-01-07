import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";

// const posts = [
//   {
//     id: "12",
//     username: "wail_ou",
//     img: `https://i.pravatar.cc/150?img=52`,
//     caption: "This is awesome!",
//   },
//   {
//     id: "15",
//     username: "hassanben",
//     img: `https://i.pravatar.cc/150?img=005`,
//     caption: "Im bored",
//   },
//   {
//     id: "4",
//     username: "isamoxix",
//     img: `https://i.pravatar.cc/150?img=69`,
//     caption: "find me a gf",
//   },
//   {
//     id: "8",
//     username: "m3ayzo",
//     img: `https://i.pravatar.cc/150?img=32`,
//     caption: "Attay & atay...",
//   },
// ];

function Posts() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      {posts
        .filter(
          (post) =>
            post.data().id === session?.user?.uid ||
            post.data().private === false
        )
        .map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.data().id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
          />
        ))}
    </div>
  );
}

export default Posts;
