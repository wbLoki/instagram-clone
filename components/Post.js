import {
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  BookOpenIcon as BookmarkIconFilled,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "likes"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => (liike.id === session?.user?.uid) !== -1)
    );
  }, [likes]);

  const likePost = async () => {
    await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
      username: session.user.username,
    });
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  console.log(comments);

  return (
    <div
      className="bg-white my-7 mt-8
    border-gray-200 border rounded-sm"
    >
      {/* Top Area */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="user avatar"
          className="h-12 w-12 cursor-pointer rounded-full
          object-obtain border p-1 mr-3"
        />
        <p className="flex-1 font-semibold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}
      <img className="object-cover w-full" src={img} alt="image" />
      {/* Buttons */}
      {session && (
        <div className="flex px-4 pt-4 justify-between">
          <div className="flex space-x-4">
            <HeartIcon className="btn" onClick={likePost} />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45 -mt-1" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* Caption */}
      <p className="p-5 truncate">
        <span className="font-semibold">{username} </span>
        <span>{caption}</span>
      </p>
      {/* Comment Section */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <form className="flex items-center p-5 border-t justify-between">
        <EmojiHappyIcon className="btn h-8" />
        <input
          placeholder={
            session ? "Add a comment..." : "Login to leave a comment."
          }
          type="text"
          className="border-none flex-1
          focus:ring-0 outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!session}
        />
        <button
          type={session ? "submit" : "button"}
          className={
            comment ? "actionBtn" : "cursor-default text-blue-300 font-semibold"
          }
          disabled={!comment.trimEnd()}
          onClick={sendComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
