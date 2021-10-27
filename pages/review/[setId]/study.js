import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SetCarousel from "../../../components/SetCarousel";
import Image from "next/dist/client/image";
import {
  getDocs,
  collection,
  query,
  where,
  setDoc,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { getAuth } from "firebase/auth";

export default function Study() {
  const [userUID, setUserUID] = useState("test-user");

  const router = useRouter();
  const { setId } = router.query;

  const [currentCard, setCurrentCard] = useState(0);
  const [cardsIds, setCardsIds] = useState([]);
  const [cards, setCards] = useState([
    {
      front: {
        title: "1",
        content: "card 1",
        images: [],
        audios: [],
      },
      back: {
        title: "",
        content: "Back side of card 1",
        images: [],
        audios: [],
      },
    },
  ]);

  // Get userUID
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user != null) {
      setUserUID(user.uid);
    }
  }, [user]);

  // check if player have a doc for this set
  async function checkSetHistory() {
    const docSnap = await getDoc(doc(db, `/history/${userUID}/sets`, setId));
    if (!docSnap.exists()) {
      setDoc(doc(db, `/history/${userUID}/sets`, setId), {});
    }
  }
  checkSetHistory();

  // get current set and it's cards
  async function getSetCards() {
    const q = query(collection(db, "cards"), where("setId", "==", setId));
    const querySnapshot = await getDocs(q);
    const cc = [];
    const dd = [];
    querySnapshot.forEach((doc) => {
      cc.push(doc.data());
      dd.push(doc.id);
    });
    setCards(cc);
    setCardsIds(dd);
  }

  useEffect(() => {
    if (setId != undefined) {
      getSetCards();
    }
  }, [setId]);

  // passed to the setCarasoul component
  function getCurrentCard(num) {
    setCurrentCard(num);
  }

  // recording user input
  const historyDocReference = db.doc(`/history/${userUID}/sets/${setId}`);

  async function incorrect() {
    await historyDocReference.update({
      [cardsIds[currentCard]]: { guess: false, lastPlayed: Date() },
    });
  }

  async function correct() {
    await historyDocReference.update({
      [cardsIds[currentCard]]: { guess: true, lastPlayed: Date() },
    });
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
