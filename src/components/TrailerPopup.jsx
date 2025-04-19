import React, { useState, useEffect } from "react";
import { sendRequest } from "../utils/send-request";
import { div } from "framer-motion/client";

const TrailerPopup = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const data = await sendRequest(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=YOUR_API_KEY`
        );
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.45)] flex justify-center items-center z-50">
      <button
        className="absolute top-4 right-6 text-4xl text-neutral-50 hover:text-neutral-200 cursor-pointer"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="rounded-md shadow-lg w-full max-w-4xl relative overflow-hidden md:h-[60%] h-[40%]">
        {trailerKey ? (
          <div className="px-4 h-full">
            <div className="h-full w-full">
              <iframe
                className="w-full h-full rounded-md"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 py-10">
            Trailer not available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrailerPopup;
