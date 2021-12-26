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
import { useState } from "react";

function Post({ id, username, userImg, img, caption }) {
  const [commentState, setCommentState] = useState(false);
  function checkComment(e) {
    if (e.target.value !== "") {
      console.log(e.target.value);
      setCommentState(true);
    } else {
      setCommentState(false);
    }
  }

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
      <div className="flex px-4 pt-4 justify-between">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn rotate-45 -mt-1" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      {/* Caption */}
      <p className="p-5 truncate">
        <span className="font-semibold">{username} </span>
        <span>{caption}</span>
      </p>
      {/* Comment Section */}
      {/* Input area */}
      <form className="flex items-center p-5 border-t justify-between">
        <EmojiHappyIcon className="btn h-8" />
        <input
          placeholder="Add a comment..."
          type="text"
          className="border-none flex-1
          focus:ring-0 outline-none"
          onInput={checkComment}
        />
        <button
          className={
            commentState
              ? "actionBtn"
              : "cursor-default text-blue-300 font-semibold"
          }
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
