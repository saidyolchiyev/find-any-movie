import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CommentList } from "../components/CommentList";
import { sendRequest } from "../utils/send-request";
import { MovieList } from "../components/MovieList";
import TrailerPopup from "../components/TrailerPopup";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await sendRequest(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        );
        const similar = await sendRequest(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`
        );

        setMovie(() => movie);
        setSimilar(() => similar.results);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [setMovie]);

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");

    if (showTrailer) {
      document.body.classList.add("overflow-hidden");
    }
  }, [showTrailer]);

  return (
    movie && (
      <div className="relative min-h-screen bg-gray-900 text-white">
        <div
          className="w-full h-[70vh] bg-cover bg-center backdrop-blur-lg"
          style={{
            background: `no-repeat top/100% url(${
              "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
              movie.backdrop_path
            })`,
          }}
        >
          <div className="w-full h-full bg-[rgba(0,0,0,.5)] flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              {movie.original_title} ({movie.release_date})
            </h1>
          </div>
        </div>
        <div className="px-3 pb-10">
          <div className="max-w-5xl mx-auto py-16 flex flex-col md:flex-row gap-8 h-ful">
            <div className="flex-shrink-0">
              <img
                src={
                  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
                  movie.poster_path
                }
                alt={movie.original_title}
                className="md:w-72 md:h-auto h-60 object-cover w-full rounded-sm shadow-lg"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h2 className="text-3xl font-semibold">{movie.original_title}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {movie.genres.map((g) => (
                  <span key={g.name}>{g.name}, </span>
                ))}
              </p>
              <div className="mt-4 space-y-2 mb-4">
                <p>
                  <span className="font-semibold">Production:</span>{" "}
                  {movie.production_companies.map((p) => (
                    <span key={p.name}>{p.name}, </span>
                  ))}
                </p>
                <p>
                  <span className="font-semibold">Language:</span>{" "}
                  {movie.original_language}
                </p>
                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {movie.production_countries.map((c) => (
                    <span key={c.name}>{c.name}, </span>
                  ))}
                </p>
                <p>
                  <span className="font-semibold">Runtime:</span>{" "}
                  {movie.runtime}
                </p>
                <p>
                  <span className="font-semibold">Release Date:</span>{" "}
                  {movie.release_date}
                </p>
              </div>
              <div className="flex gap-6">
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  ⭐{" "}
                  <span className="font-semibold">{movie.vote_average}/10</span>{" "}
                  (IMDB)
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  🍅{" "}
                  <span className="font-semibold">
                    {Math.round(movie.popularity) || "N/A"}
                  </span>{" "}
                  (Rotten Tomatoes)
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg mb-2">
                <h3 className="text-lg font-semibold">💰 Box Office</h3>
                <p className="text-gray-300">${movie.revenue}</p>
              </div>
              <button
                type="button"
                className="text-center w-full py-2 outline-none rounded-sm hover:bg-blue-600 bg-blue-500 transition-all cursor-pointer"
                onClick={() => setShowTrailer(true)}
              >
                Show trailer
              </button>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mb-2">
            <div className="mb-10">
              <h1 className="text-4xl mb-4">Recommendations</h1>
              <MovieList movies={similar.slice(0, 4)} toggle={true} />
            </div>
            <CommentList movieId={id} />
          </div>
        </div>

        {showTrailer && (
          <TrailerPopup movieId={id} onClose={() => setShowTrailer(false)} />
        )}
      </div>
    )
  );
};
