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

  // Get userUID
  const [userUID, setUserUID] = useState("4IuX8X4Rj9fg1fGyHq9DujOSoKq1");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.data != null) {
      setUserUID(user.data.uid);
    }
  }, [user.data]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // get set cards
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentSet({ setId: setId }));
  }, [dispatch, setId]);

  const cards = useSelector((state) => state.history.currentSet.cardsData);
  const cardsIds = useSelector((state) => state.history.currentSet.cardsIds);

  function correct() {
    dispatch(
      recordCorrect({
        setId: setId,
        userUID: userUID,
        cardId: cardsIds[currentCardIndex],
      })
    );
  }

  function incorrect() {
    dispatch(
      recordIncorrect({
        setId: setId,
        userUID: userUID,
        cardId: cardsIds[currentCardIndex],
      })
    );
  }

  function getCurrentCard(num) {
    setCurrentCardIndex(num);
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
