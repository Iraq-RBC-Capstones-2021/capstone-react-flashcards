import React, { useEffect, useState } from "react";
import Image from "next/image";
import ScoreProgress from "../../../components/ScoreProgress";
import { useRouter } from "next/dist/client/router";
import { db } from "../../../firebase";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Review() {
  const [toReview, setToReview] = useState(0);
  const [learning, setLearning] = useState(0);
  const [newCards, setNewCards] = useState(0);

  const [cardCount, setCardCount] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const [setName, setSetName] = useState("Set Name");
  const router = useRouter();
  const { setId } = router.query;

  // Get userUID
  const userUID = "user2";

  // check if user have history, if not create one.
  async function checkUserHistory() {
    const docSnap = await getDoc(doc(db, "history", userUID));
    if (!docSnap.exists()) {
      setDoc(doc(db, "history", userUID), { sets: null });
    } else {
      // check to see if user played this set before
      if (docSnap.data().sets != null) {
        console.log("user Have history", docSnap.data().sets);
        // if user have played this set get it's history.
      } else {
        console.log("user have not played any sets");
      }
    }
  }

  // Get correct set name to display and card count to do statistics
  async function getSetCardsCount() {
    const q = query(collection(db, "cards"), where("setId", "==", setId));
    const querySnapshot = await getDocs(q);
    console.log("query snapshot ===>>>", querySnapshot.docs.length);
    setCardCount(querySnapshot.docs.length);
  }
  async function getSetName() {
    const setSnap = await getDoc(doc(db, "sets", setId));
    console.log("setSnap ===>>> ", setSnap.data().title);
    setSetName(setSnap.data().title);
  }

  // set the correct statistics
  function statistics() {
    if (firstTime) {
      setNewCards(cardCount);
    } else {
      //
    }
  }

  useEffect(() => {
    if (setId != undefined) {
      checkUserHistory();
      getSetCardsCount();
      getSetName();
    }
  }, [router.query]);

  useEffect(() => {
    statistics();
  }, [cardCount]);

  return (
    <div className="flex justify-center my-10">
      <div className=" lg:max-w-lg flex flex-col  ">
        <div className="flex justify-between mt-10">
          <div>
            <Image
              src="/assets/svg/ic_chevron_right.svg"
              alt=""
              width="18"
              height="18"
            />
            {setName}:
          </div>
          <Image src="/assets/svg/Settings.svg" alt="" width="18" height="18" />
        </div>
        <div className="flex justify-center mt-10 ">
          <ScoreProgress number={toReview} title="To Review" color="#52C41A" />
          <ScoreProgress number={learning} title="Learning" />
          <ScoreProgress number={newCards} title="New" color="#1890FF" />
        </div>
        <div className=" flex justify-center mt-10">
          <button
            className="btn-primary"
            onClick={() => router.push(`./${setId}/study`)}
          >
            {" "}
            Study
          </button>
        </div>
      </div>
    </div>
  );
}
