import React, { useState } from "react";
import { motion } from "framer-motion";

export const Comment = ({ comment, addReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className="border-l-4 border-blue-500 pl-4 my-2">
      <p>{comment.text}</p>
      <button
        className="text-blue-500 text-sm mt-1 cursor-pointer"
        onClick={() => setShowReplyInput(!showReplyInput)}
      >
        {showReplyInput ? "Cancel" : "Reply"}
      </button>
      {showReplyInput && (
        <div className="mt-2">
          <input
            type="text"
            className="border py-1 px-2 rounded w-full mb-1"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white text-sm px-6 py-1 rounded mt-1 cursor-pointer hover:bg-blue-600 transition-all"
            onClick={() => {
              if (replyText.trim()) {
                addReply(comment.id, replyText, "You");
                setReplyText("");
                setShowReplyInput(false);
              }
            }}
          >
            Add Reply
          </motion.button>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className="ml-6 border-l border-gray-300 pl-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} addReply={addReply} />
          ))}
        </div>
      )}
    </div>
  );
};
