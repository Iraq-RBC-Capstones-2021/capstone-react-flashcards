import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import AddOrRemoveSetButton from "../../components/AddOrRemoveSetButton";
import CommentList from "../../components/CommentList";
import Section from "../../components/Section";
import SetCarousel from "../../components/SetCarousel";
import data from "../../users.json";
import { getSetDetails } from "../../store/sets/setsSlice";

export default function SetPage() {
  const router = useRouter();
  const { setId } = router.query;

  const dispatch = useDispatch();
  const setDetails = useSelector((state) => state.sets.data.setDetails);
  const pageStatus = useSelector((state) => state.sets.status);

  useEffect(() => {
    if (setId) {
      dispatch(getSetDetails(setId));
    }
  }, [setId, dispatch]);

  if (pageStatus === "loading" || !setId) return <h1>Loading...</h1>;

  const allUsers = data.users;
  const all = (user) => {
    return (
      <CommentList
        key={user.id}
        title={user.title}
        avatar={user.avatar}
        comment={user.comment}
      />
    );
  };

  return (
    <div className="sm:px-4 md:px-4 lg:px-32">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
        />
      </Head>
      <Section
        title={setDetails.set.title}
        desc={setDetails.set.description}
        image={setDetails.set.imageUrl}
      >
        <ul className="flex cursor-pointer">
          <li>
            <i className="fas fa-star fa-md text-primary mr-1"></i>
          </li>
          <li>
            <i className="fas fa-star fa-md text-primary mr-1"></i>
          </li>
          <li>
            <i className="fas fa-star fa-md text-primary mr-1"></i>
          </li>
          <li>
            <i className="far fa-star fa-md text-primary mr-1"></i>
          </li>
          <li>
            <i className="far fa-star fa-md text-primary mr-4"></i>
          </li>
          <li className="font-semibold">3.5/5</li>
        </ul>

        <div className="pr-36 py-10">
          <AddOrRemoveSetButton
            className="py-2 px-8 btn-primary text-base"
            setId={setId}
          />
        </div>
      </Section>
      {setDetails.cards.length > 0 ? (
        <>
          <p className="font-medium text-2xl lg:pl-52 py-14">
            <i className="fas fa-chevron-right fa-sm mr-4"></i>
            Set Content
          </p>
          <SetCarousel set={setDetails.cards} />
        </>
      ) : null}
      <div className="p-5 mt-12 bg-gray-100 rounded-3xl">
        <p className="font-medium text-2xl lg:pl-52 py-14">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Comments
        </p>
        <div className="flex justify-center">
          <ul style={{ maxHeight: "500px", overflowY: "auto" }}>
            {allUsers.map(all)}
          </ul>
        </div>
        <div className="flex flex-row-reverse pr-36 py-8">
          <button type="button" className="py-2 px-8 btn-primary">
            View 23 more comments
          </button>
        </div>
      </div>
      <form className="sm:px-4 md:px-4 lg:px-24 text-gray py-32">
        <div className="mb-3">
          <small className="text-gray">Leave a comment:</small>
          <textarea
            className="p-2 w-full text-black border-2 border-black rounded focus:outline-none focus:ring ring-grey"
            rows="6"
            placeholder="Add comment"
          ></textarea>
        </div>
        <div className="flex flex-row-reverse">
          <button type="submit" className="py-2 px-8 btn-primary">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
