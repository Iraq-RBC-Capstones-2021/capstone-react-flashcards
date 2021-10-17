import CarouselCard from "./CarouselCard";
import { useState } from "react";

function SetCarousel({
  set = [
    {
      front: {
        title: "",
        content: "",
        images: [],
        audios: [],
      },
      back: {
        title: "",
        content: "",
        images: [],
        audios: [],
      },
    },
  ],
}) {
  const [flag, setFlag] = useState(0);
  const [flip, setFlip] = useState(true);

  const flashcard = set[flag];

  const handlePrevious = () => {
    if (flag > 0) {
      setFlag(flag - 1);
      setFlip(true);
    }
  };

  const handleNext = () => {
    if (flag < set.length - 1) {
      setFlag(flag + 1);
      setFlip(true);
    }
  };

  const toggleFlip = () => {
    setFlip(!flip);
  };

  return (
    <>
      <div className="grid place-items-center">
        <div className="flex w-full lg:w-5/6">
          {/* previous-card button */}
          <button
            className="p-4 w-20 h-20 self-center"
            onClick={handlePrevious}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="fill-current text-black"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M26.5034 30.3851C27.1192 30.9393 27.1691 31.8877 26.6149 32.5035C26.0608 33.1192 25.1123 33.1691 24.4966 32.615L9.49655 19.115C8.83448 18.5191 8.83448 17.4809 9.49655 16.8851L24.4966 3.38507C25.1123 2.83088 26.0608 2.8808 26.6149 3.49657C27.1691 4.11233 27.1192 5.06077 26.5034 5.61495L12.7423 18L26.5034 30.3851Z" />
              </g>
            </svg>
          </button>

          {/* card */}
          <div className="scene w-full h-96 p-10 m-10">
            <div
              className={flip ? "card" : "card is-flip"}
              onClick={toggleFlip}
            >
              <div className="card-face card-face-front">
                <CarouselCard flashcard={flashcard.front} />
              </div>
              <div className="card-face card-face-back">
                <CarouselCard flashcard={flashcard.back} />
              </div>
            </div>
          </div>

          {/* next-card button */}
          <button className="p-4 w-20 h-20 self-center" onClick={handleNext}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="fill-current text-black"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.49657 30.3851C8.8808 30.9393 8.83088 31.8877 9.38507 32.5035C9.93926 33.1192 10.8877 33.1691 11.5035 32.615L26.5035 19.115C27.1655 18.5191 27.1655 17.4809 26.5035 16.8851L11.5035 3.38507C10.8877 2.83088 9.93926 2.8808 9.38507 3.49657C8.83088 4.11233 8.8808 5.06077 9.49657 5.61495L23.2577 18L9.49657 30.3851Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* number of card */}
      <div className="w-20 overflow-hidden mx-auto place-items-center mt-8">
        <div className="flex justify-between text-center border-2 border-black rounded-lg">
          <div className="flex-grow">{flag + 1}</div>
          <div className="bg-primary flex-grow text-white rounded-tr-lg rounded-br-lg">
            {set.length}
          </div>
        </div>
      </div>
    </>
  );
}
export default SetCarousel;
