import React, { useState } from "react";
import { Main } from "./pages/Main";
import { WatchList } from "./pages/WatchList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";

export const API = "http://www.omdbapi.com/?apikey=d47c1c7c&";

const App = () => {
  const [search, setSearch] = useState("interstellar");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Main search={search} setSearch={setSearch} />}
        />
        <Route path="/:id" index element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </Router>
  );
};

export default App;
