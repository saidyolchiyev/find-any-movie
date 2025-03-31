import React from "react";
import { Movie } from "./Movie";

export const MovieList = ({ movies, toggle }) => {
  return (
    <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1">
      {movies.map((m) => {
        return <Movie movie={m} toggle={toggle} key={m.imdbID} />;
      })}
    </div>
  );
};
