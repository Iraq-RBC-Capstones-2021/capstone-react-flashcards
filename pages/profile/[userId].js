import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { getProfileSets } from "../../store/sets/setsSlice";
import Avatar from "../../public/assets/Avatar.png";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  const userSets = useSelector((state) => state.sets.data.profile.sets);
  const userInfo = useSelector((state) => state.sets.data.profile.userInfo);
  const pageStatus = useSelector((state) => state.sets.status);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileSets(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      {pageStatus === "loading" || !userInfo ? (
        <Loading />
      ) : (
        <div className="mx-2">
          <div className="text-center  m-16">
            <Image
              src={userInfo.photoURL ? userInfo.photoURL : Avatar}
              alt="avater"
              height={230}
              width={230}
              className="rounded-full"
            />
            <h1 className="text-4xl	 font-bold mt-4">{userInfo.displayName}</h1>
          </div>
          <h3 className="font-bold text-2xl  mb-10">
            &#62; {userInfo.displayName}’s sets
          </h3>
          <div className="flex flex-wrap justify-between self-center lg:mx-11 md:justify-center">
            {userSets.map((set) => (
              <Card key={set.setId} {...set} avatar={userInfo.photoURL} />
            ))}
          </div>
          <div className="flex justify-end mb-2">
            <button className="btn-primary w-28 h-10">View all</button>
          </div>
        </div>
      )}
    </>
  );
}
