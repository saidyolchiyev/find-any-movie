import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../App";
import { CommentList } from "../components/CommentList";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API + `i=${id}`);
        const data = await res.json();

        setMovie(() => data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [setMovie]);

  return (
    movie && (
      <div className="relative min-h-screen bg-gray-900 text-white">
        <div
          className="w-full h-[70vh] bg-cover bg-center backdrop-blur-lg"
          style={{ background: `no-repeat top/100% url(${movie.Poster})` }}
        >
          <div className="w-full h-full bg-[rgba(0,0,0,.5)] flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              {movie.Title} ({movie.Year})
            </h1>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="md:w-72 md:h-auto h-60 object-cover w-full rounded-sm shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold">{movie.Title}</h2>
            <p className="text-gray-400 text-sm mt-1">{movie.Genre}</p>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-semibold">Director:</span>{" "}
                {movie.Director}
              </p>
              <p>
                <span className="font-semibold">Actors:</span> {movie.Actors}
              </p>
              <p>
                <span className="font-semibold">Writer:</span> {movie.Writer}
              </p>
              <p>
                <span className="font-semibold">Language:</span>{" "}
                {movie.Language}
              </p>
              <p>
                <span className="font-semibold">Country:</span> {movie.Country}
              </p>
              <p>
                <span className="font-semibold">Runtime:</span> {movie.Runtime}
              </p>
              <p>
                <span className="font-semibold">Release Date:</span>{" "}
                {movie.Released}
              </p>
            </div>
            <div className="mt-4 flex gap-6">
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                ⭐ <span className="font-semibold">{movie.imdbRating}/10</span>{" "}
                (IMDB)
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                🍅{" "}
                <span className="font-semibold">
                  {movie.Ratings?.[1]?.Value || "N/A"}
                </span>{" "}
                (Rotten Tomatoes)
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">🏆 Awards</h3>
              <p className="text-gray-300">{movie.Awards}</p>
            </div>
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">💰 Box Office</h3>
              <p className="text-gray-300">{movie.BoxOffice}</p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <CommentList movieId={id} />
        </div>
      </div>
    )
  );
};
