import { CircleMinus, Heart } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { addMovie, removeMovie } from "../store/watchlist-reducer";
import { Link } from "react-router";
import { motion } from "framer-motion";

export const Movie = ({ movie, toggle }) => {
  const dispatch = useDispatch();

  return (
    <Link to={`/${movie.id}`}>
      <div className="bg-white text-[#141414] p-3 rounded-sm cursor-pointer transform hover:scale-[102%] transition-all relative h-full">
        <img
          src={
            "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
            movie.poster_path
          }
          alt=""
          className="w-full h-[350px] object-cover"
        />
        <div className="py-2">
          <div className="pt-2 font-semibold text-xl mb-1">{movie.title}</div>
          <div className="text-sm text-neutral-500 font-bold">
            {movie.release_date}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.4)] flex items-end p-5 opacity-0 hover:opacity-100 transition-all">
          {toggle ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center text-white w-full bg-[#141414] p-2 rounded-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addMovie(movie));
              }}
            >
              <span>Add to watchlist </span>&nbsp;
              <Heart fill="#DB4444" strokeWidth={0} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center text-white w-full bg-[#141414] p-2 rounded-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeMovie(movie.id));
              }}
            >
              <span>Remove from watchlist</span>&nbsp;
              <CircleMinus />
            </motion.button>
          )}
        </div>
      </div>
    </Link>
  );
};

/* details page and nested comments */
