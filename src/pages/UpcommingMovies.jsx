import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { sendRequest } from "../utils/send-request";
import { MovieList } from "../components/MovieList";

export const UpcommingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    const res = await sendRequest(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&page=${page}`
    );

    setMovies((prev) => [...prev, ...res.results]);
    setHasMore(res.page < res.total_pages);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    const f = windowHeight + scrollTop > scrollHeight - 20;

    if (f && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, loading, hasMore]);

  return (
    <div>
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
        <div className="flex md:items-end flex-col md:flex-row py-5">
          <h3 className="text-3xl mr-5 mb-2 md:mb-0">Upcomming Movies</h3>
          <div>
            <Link to={"/"} className="hover:underline mx-2">
              Home
            </Link>
            <Link to={"/top"} className="hover:underline mx-2">
              Top Movies
            </Link>
            <Link to={"/watchlist"} className="hover:underline mx-2">
              WatchList
            </Link>
          </div>
        </div>
        <hr />
        <div className="py-5">
          <MovieList movies={movies} toggle={true} />
          {loading && <p>Loading ...</p>}
        </div>
        {/* <div className="h-[100vh]"></div> */}
      </div>
    </div>
  );
};
