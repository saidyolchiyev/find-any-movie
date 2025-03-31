import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MovieList } from "../components/MovieList";
import { API } from "../App";
import { Link } from "react-router-dom";

export const Main = ({ search, setSearch }) => {
  const [movies, setMovies] = useState([]);

  const watchlist = useSelector((state) => state.watchlist);
  console.log(watchlist);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API + `s=${search}`);
        const data = await res.json();

        setMovies(() => data.Search);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [setMovies, search]);

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
      <div className="flex py-5 flex md:flex-row flex-col">
        <div className="flex items-end md:mb-0 mb-4">
          <div className="text-3xl mr-6">FindAnyMovie</div>
          <Link to={"/watchlist"} className="hover:underline">
            Watchlist
          </Link>
        </div>
        <input
          type="text"
          className="border-2 border-neutral-300 rounded text-white md:ml-auto px-5 py-2 outline-none md:max-w-[300px] w-full"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr />
      <div className="py-5">
        {movies ? (
          <MovieList movies={movies} toggle={true} />
        ) : (
          <div>Try to find the desired movie ..</div>
        )}
      </div>
    </div>
  );
};
