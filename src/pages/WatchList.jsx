import React from "react";
import { MovieList } from "../components/MovieList";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export const WatchList = ({}) => {
  const movies = useSelector((state) => state.watchlist.movies);
  console.log(movies);

  return (
    <div className="container">
      <div className="fixed top-0 left-0 h-[100vh] w-full -z-20">
        <img
          src="https://www.katebackdrop.com/cdn/shop/products/CM-0399-A.jpg?v=1683508256&width=400"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.8))",
          }}
        ></div>
      </div>
      <div className="flex items-end py-5">
        <h3 className="text-3xl  mr-5">WatchList</h3>
        <Link to={"/"} className="hover:underline">
          Home
        </Link>
      </div>
      <hr />
      <div className="py-5">
        {!movies ? (
          <div>No movies yet ..</div>
        ) : (
          <MovieList movies={movies} toggle={false} />
        )}
      </div>
    </div>
  );
};
