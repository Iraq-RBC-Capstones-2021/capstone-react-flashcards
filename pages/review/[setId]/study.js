import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SetCarousel from "../../../components/SetCarousel";
import Image from "next/dist/client/image";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSet,
  recordCorrect,
  recordIncorrect,
} from "../../../store/history/historySlice";

export default function Study() {
  const router = useRouter();
  const { setId } = router.query;

  const [currentCard, setCurrentCard] = useState(0);

  // Get userUID
  const userUID = useSelector((state) => state.user.data.uid);
  const cards = useSelector((state) => state.history.currentSet.cardsData);
  const cardsIds = useSelector((state) => state.history.currentSet.cardsIds);
  // get current card number from setCarasoul
  function getCurrentCard(num) {
    console.log({ num });
  }

  // get set cards
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentSet({ setId: setId }));
  }, [dispatch, setId]);

  // passed to the setCarasoul component
  function getCurrentCard(num) {
    setCurrentCard(num);
  }

  function correct() {
    dispatch(
      recordCorrect({
        setId: setId,
        userUID: userUID,
        currentCard: currentCard,
        cardId: cardsIds[currentCard],
      })
    );
  }

  function incorrect() {
    dispatch(
      recordIncorrect({
        setId: setId,
        userUID: userUID,
        currentCard: currentCard,
        cardId: cardsIds[currentCard],
      })
    );
  }

  return (
    <div>
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
          {" "}
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
  );
}
