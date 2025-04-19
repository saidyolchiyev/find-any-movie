import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./Comment";
import { addComment, addReply } from "../store/comments-reducer";
import { motion } from "framer-motion";

/* {id, text, replies: [] } */

export const CommentList = ({ movieId }) => {
  const comments = useSelector((state) => state.comments.items).filter(
    (c) => c.movieId == movieId
  );
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const addCommentHandler = () => {
    if (newComment.trim()) {
      dispatch(addComment({ newComment, movieId }));
      setNewComment("");
    }
  };

  const addReplyHandler = (commentId, text) => {
    dispatch(addReply({ commentId, text }));
  };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border py-2 px-4 rounded w-full"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white text-sm px-10 py-2 rounded mt-2 cursor-pointer hover:bg-blue-600 transition-all"
          onClick={addCommentHandler}
        >
          Add Comment
        </motion.button>
      </div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReplyHandler}
        />
      ))}
    </div>
  );
};
