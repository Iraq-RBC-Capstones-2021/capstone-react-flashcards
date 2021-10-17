import React, { useState, useEffect, useCallback } from "react";
import Player from "./AudioPlayer";

function CarouselCard({
  flashcard = { title: "", content: "", images: [], audios: [] },
}) {
  let hasAudio = flashcard.audios && flashcard.audios.length > 0;
  const SSR = typeof window === "undefined";

  return (
    <div className="container h-96 p-4 shadow-md rounded-xl text-center relative">
      {/* title */}
      <h1 className="text-2xl">{flashcard.title}</h1>

      {/* content */}
      <p>{flashcard.content}</p>

      {/* image */}
      <div className="flex justify-center h-40">
        {flashcard.images.map((image) => (
          <img key={image} src={image} alt="" />
        ))}
      </div>

      {/* audio */}
      <div className="container mx-auto">
        {hasAudio && (
          <div className="inline-flex items-center justify-center place-items-center justify-between absolute bottom-4 border-2 border-black rounded-lg content-center">
            {flashcard.audios.map((audio) => (
              <button
                key={audio}
                className="group rounded-lg hover:bg-primary active:bg-primary p-1 transition-all duration-150"
                type="button"
                onClick={(e) => e.stopPropagation()}
              >
                {!SSR ? <Player url={audio} /> : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CarouselCard;
