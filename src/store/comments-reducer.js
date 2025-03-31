import { createSlice } from "@reduxjs/toolkit";
import { CommentList } from "../components/CommentList";

const getInitialState = () => {
  const savedData = localStorage.getItem("comments");
  return savedData ? JSON.parse(savedData) : [];
};

const commentsReducer = createSlice({
  name: "comments",
  initialState: { items: getInitialState() },
  reducers: {
    addComment: (state, action) => {
      const { newComment, movieId } = action.payload;
      state.items.push({
        id: Date.now(),
        movieId,
        text: newComment,
        replies: [],
      });
      localStorage.setItem("comments", JSON.stringify(state.items));
    },
    addReply: (state, action) => {
      const { commentId, text } = action.payload;

      const updateComments = (commentsList) => {
        console.log(typeof commentsList);

        if (!commentsList) return;

        return commentsList.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text, replies: [] },
              ],
            };
          } else if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateComments(comment.replies),
            };
          }
          return comment;
        });
      };
      state.items = updateComments(state.items);
      localStorage.setItem("comments", JSON.stringify(state.items));
    },
  },
});

export const { addComment, addReply } = commentsReducer.actions;

export default commentsReducer.reducer;

/* 
function findCommentById(list, id):
  const c = list.map(c => {
      if c.comments {
        findCommentById(c.comments, id)
      }
      return c
    })
*/
