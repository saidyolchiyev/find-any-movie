import { createSlice, current } from "@reduxjs/toolkit";

const getInitialState = () => {
  const savedData = localStorage.getItem("watchlist");
  return savedData ? JSON.parse(savedData) : [];
};

const watchlistReducer = createSlice({
  name: "movies",
  initialState: { movies: getInitialState() },
  reducers: {
    addMovie: (state, action) => {
      const m = state.movies.find((i) => i.imdbID == action.payload.imdbID);
      if (m) return;
      const newState = [...state.movies, action.payload];
      localStorage.setItem("watchlist", JSON.stringify(newState));
      state.movies = newState;
    },
    removeMovie: (state, action) => {
      const newState = state.movies.filter((m) => m.imdbID != action.payload);
      localStorage.setItem("watchlist", JSON.stringify(newState));
      state.movies = newState;
    },
  },
});

export const { addMovie, removeMovie } = watchlistReducer.actions;

export default watchlistReducer.reducer;
