import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MovieList } from "../components/MovieList";
// import { API } from "../App";
import { Link } from "react-router-dom";
import { sendRequest } from "../utils/send-request";
import { SortingForm } from "../components/SortingForm";

export const Main = ({ form, setForm }) => {
  const [movies, setMovies] = useState([]);

  const watchlist = useSelector((state) => state.watchlist);
  // console.log(watchlist);

  const sortResults = (movies, sortBy) => {
    switch (sortBy) {
      case "popularity":
        return [...movies].sort((a, b) => b.popularity - a.popularity);
      case "release_date":
        return [...movies].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "vote_average":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case "title":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return movies;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest(
          `https://api.themoviedb.org/3/search/movie?query=${form.search}&include_adult=false&language=en-US&page=1`
        );

        setMovies(() => sortResults(data.results, form.sort));
      } catch (e) {
        console.error(e);
      }
    };

    if (!form.search.length) {
      setMovies(null);
      return;
    }

    fetchData();
  }, [setMovies, form]);

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
      <div className="flex py-5 md:flex-row flex-col">
        <div className="flex md:items-end md:mb-0 mb-4 md:flex-row flex-col">
          <div className="text-3xl mr-6 md:mb-0 mb-2">FindAnyMovie</div>
          <div>
            <Link to={"/upcomming"} className="hover:underline mx-2">
              Upcomming
            </Link>
            <Link to={"/top"} className="hover:underline mx-2">
              Top Movies
            </Link>
            <Link to={"/watchlist"} className="hover:underline mx-2">
              Watchlist
            </Link>
          </div>
        </div>
        <SortingForm form={form} setForm={setForm} />
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
