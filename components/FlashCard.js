import { useState } from "react";
import CarouselCard from "./CarouselCard";

export default function FlashCardTwo({ front, back }) {
  const [flip, setFlip] = useState(true);

  const toggleFlip = () => {
    setFlip(!flip);
  };

  return (
    <div className="cardContainer w-full h-96" onClick={toggleFlip}>
      <div className={`front ${flip ? "front-flip" : ""} `}>
        <CarouselCard flashcard={front} />
      </div>
      <div className={`back ${flip ? "back-flip" : ""}`}>
        <CarouselCard flashcard={back} />
      </div>
    </div>
  );
}
