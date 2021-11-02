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

  const router = useRouter();
  const { setId } = router.query;

  const dispatch = useDispatch();

  const history = useSelector((state) => state.history.userHistory);

  // Get userUID
  const [userUID, setUserUID] = useState("4IuX8X4Rj9fg1fGyHq9DujOSoKq1");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.data != null) {
      setUserUID(user.data.uid);
    }
  }, [user.data]);

  useEffect(() => {
    dispatch(userHistory({ userUID: userUID, setId: setId }));
  }, [dispatch, userUID, setId]);
  useEffect(() => {
    dispatch(currentSet({ setId: setId }));
    setProgress();
  }, [dispatch, setId]);

  function setProgress() {
    setToReview(51);
    setLearning(24);
    setNewCards(31);
  }

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
