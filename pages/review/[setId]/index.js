import React, { useEffect, useState } from "react";
import Image from "next/image";
import ScoreProgress from "../../../components/ScoreProgress";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "../../../store/user/userSlice";
import { currentSet, userHistory } from "../../../store/history/historySlice";

export default function Review() {
  const [toReview, setToReview] = useState(0);
  const [learning, setLearning] = useState(0);
  const [newCards, setNewCards] = useState(0);

  const [setName, setSetName] = useState("Set Name");

  const router = useRouter();
  const { setId } = router.query;

  const dispatch = useDispatch();

  const history = useSelector((state) => state.history.userHistory);

  // Get userUID

  //
  const dispatchUser = useDispatch();
  useEffect(() => {
    dispatchUser(
      signInWithEmailAndPassword({
        email: "yasser@cards.com",
        password: "123456@A",
      })
    );
  }, [dispatchUser]);

  //  Yasser@cards.com 123456@A
  const user = useSelector((state) => state.user);
  let userUID = "";
  if (user.data != null) {
    userUID = user.data.uid;
  }

  useEffect(() => {
    dispatch(userHistory({ userUID: userUID, setId: setId }));
  }, [dispatch, userUID, setId]);
  useEffect(() => {
    dispatch(currentSet({ setId: setId }));
  }, [dispatch, setId]);

  function setProgress() {
    if (currentSet.length > 0) {
      setToReview(Math.ceil(currentSet.length / 3));
      setLearning(Math.ceil(currentSet.length / 3));
      setNewCards(Math.ceil(currentSet.length - learning - toReview));
    }
  }

  // // check if user have history, if not create one.
  // async function userHistory() {
  //   const docSnap = await getDoc(doc(db, "history", userUID));
  //   if (!docSnap.exists()) {
  //     setDoc(doc(db, "history", userUID), {});
  //   } else {
  //     // check to see if user played this set before
  //     const setShouldBeAt = db.doc(`/history/${userUID}/sets/${setId}`);
  //     if ((await getDoc(setShouldBeAt)).exists()) {
  //       setFirstTime(false);
  //       const sh = await getDoc(setShouldBeAt);
  //       setHistoryOfSet(sh.data());
  //     } else {
  //     }
  //   }
  // }

  // // Get correct set name to display and card count to do statistics
  // async function getSetCardsCount() {
  //   const q = query(collection(db, "cards"), where("setId", "==", setId));
  //   const querySnapshot = await getDocs(q);
  //   setCardCount(querySnapshot.docs.length);
  // }
  // async function getSetName() {
  //   const setSnap = await getDoc(doc(db, "sets", setId));
  //   setSetName(setSnap.data().title);
  // }

  // // set statistics
  // async function statistics() {
  //   if (firstTime) {
  //     setNewCards(cardCount);
  //   } else {
  //     const hh = Object.values(historyOfSet);

  //     const toReview = hh.filter((el) => !el.guess);
  //     setToReview(toReview.length);

  //     const learning = hh.filter((el) => el.guess);
  //     setLearning(learning.length);

  //     const nn = cardCount - learning.length - toReview.length;
  //     setNewCards(nn);
  //   }
  // }

  // useEffect(() => {
  //   if (setId != undefined) {
  //     userHistory();
  //     getSetCardsCount();
  //     getSetName();
  //   }
  // }, [router.query, userUID]);

  // useEffect(() => {
  //   statistics();
  // }, [cardCount, historyOfSet, userUID]);

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
            {"Set Progress"}:
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
