import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Card from "../components/Card";
import { ScoreProgress } from "../components/ScoreProgress";
import { getMineSets } from "../store/sets/setsSlice";
import Loading from "../components/Loading";

const Library = () => {
  const dispatch = useDispatch();
  const mineSets = useSelector((state) => state.sets.data.mine);
  const userInfo = useSelector((state) => state.user.data);
  const pageStatus = useSelector((state) => state.sets.status);

  useEffect(() => {
    if (userInfo) {
      dispatch(getMineSets(userInfo.uid));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {pageStatus === "loading" || !userInfo ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col my-20">
            <h1 className="font-bold text-2xl	">
              {" "}
              &#62; Collection’s Statistics
            </h1>
            <div className="flex flex-wrap  justify-center mt-14">
              {/* the progress bar have these props (title,number,color,trailColor) */}
              <ScoreProgress title="To Review" number="30" color="#52C41A" />
              <ScoreProgress title="Learning" number="50" />
              <ScoreProgress title="New" number="20" color="#1890FF" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl">
              {" "}
              &#62; {userInfo.displayName}’s sets
            </h1>
            <div className="grid justify-items-center items-center gap-x-20 xl:mx-12  xl:grid-cols-3 lg:grid-cols-2 lg:mx-28  md:grid-cols-1 sm:grid-cols-2">
              {mineSets.map((set) => (
                <Card key={set.setId} {...set} inLibrary />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Library;
