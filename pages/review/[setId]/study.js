import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import SetCarousel from "../../../components/SetCarousel";
import Image from "next/dist/client/image";
import { currentSet } from "../../../store/history/historySlice";

export default function Study() {
  const router = useRouter();
  const { setId } = router.query;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [reviewEnded, setReviewEnded] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // get set cards
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentSet({ setId: setId }));
  }, [dispatch, setId]);

  const cards = useSelector((state) => state.history.currentSet.cardsData);
  const setName = useSelector((state) => state.history.currentSet.setName);

  function correct() {
    setCorrectCount((prev) => prev + 1);
    if (currentCardIndex === cards.length - 1) {
      setReviewEnded(true);
    }
  }

  function incorrect() {
    setIncorrectCount((prev) => prev + 1);
    if (currentCardIndex === cards.length - 1) {
      setReviewEnded(true);
    }
  }

  function getCurrentCard(num) {
    setCurrentCardIndex(num);
  }

  return (
    <div>
      {!reviewEnded ? (
        <div className="flex flex-col justify-center  w-full h-screen">
          <h1 className="text-2xl mb-10 text-center font-semibold">
            {setName}
          </h1>
          <SetCarousel set={cards} getCurrentCard={getCurrentCard} />
          <div className="flex  justify-center my-10">
            {/* Incorrect button */}
            <button
              onClick={() => {
                incorrect();
              }}
              className=" focus:bg-red-300 btn-secondary"
            >
              {" "}
              <Image
                src="/assets/svg/ic-false.svg"
                alt="incorrect"
                width={12}
                height={12}
              />{" "}
              Incorrect
            </button>

            {/* Correct button */}
            <button
              onClick={() => correct()}
              className=" focus:bg-green-300 btn-secondary ml-20"
            >
              <Image
                src="/assets/svg/ic-true.svg"
                alt="correct"
                width={16}
                height={16}
              />
              Correct
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col font-light justify-center items-center w-full h-screen">
          <h2 className="text-2xl mb-8">Congratulations!</h2>
          <p className="mx-4 w-96 text-center text-xl mb-8">
            You have finished reviewing this set for today!
          </p>
          <p className="mx-4 w-96 text-center text-lg mb-8">
            <span>You&apos;ve Answred </span>
            <div className="flex justify-between items-center">
              <span className="text-grass font-semibold">
                {correctCount} Correct Cards
              </span>
              <span className="text-red-500 font-semibold">
                {incorrectCount} incorrect Cards
              </span>
            </div>
          </p>
          <Link href="/library">
            <a className="btn-secondary font-normal">Go To Library</a>
          </Link>
        </div>
      )}
    </div>
  );
}
