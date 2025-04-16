import React, { useState } from "react";
import { Main } from "./pages/Main";
import { WatchList } from "./pages/WatchList";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";

const App = () => {
  const [form, setForm] = useState({
    search: "",
    genre: "",
    sort: "",
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main form={form} setForm={setForm} />} />
        <Route path="/:id" index element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </Router>
  );
};

export default App;
