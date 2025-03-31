import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlist-reducer";
import commentsReducer from "./comments-reducer";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    comments: commentsReducer,
  },
});
