import CommentList from "../components/CommentList";
import Section from "../components/Section";
import SetCarousel from "../components/SetCarousel";
import data from "../users.json";
import Head from "next/head";

export default function SetPage() {
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

  const addToLibrary = () => {};

  const deck = [
    {
      front: {
        title: "flashcard 1",
        content: "some text1",
        images: [
          "https://cdn.pixabay.com/photo/2018/10/13/08/39/hohenschwangau-3743780_960_720.jpg",
        ],
      },
      back: {
        title: "flashcardss 1",
        content: "some text11",
        images: [
          "https://cdn.pixabay.com/photo/2020/12/23/14/01/river-5855081_960_720.jpg",
        ],
      },
    },
    {
      front: {
        title: "flashcard 2",
        content: "some text2",
        images: [
          "https://cdn.pixabay.com/photo/2021/10/10/10/45/fog-6696312_960_720.jpg",
        ],
      },
      back: {
        title: "flashcardss 2",
        content: "some text22",
        images: [
          "https://cdn.pixabay.com/photo/2018/10/13/08/39/hohenschwangau-3743780_960_720.jpg",
        ],
      },
    },
  ];
  return (
    <div className="sm:px-4 md:px-4 lg:px-32">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
        />
      </Head>

      <Section
        title="2k Most Common English Words"
        desc="Study the most popluar english words that we can think of with this amazing cards set."
        image="/assets/placeholder_img.png"
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
          <button
            type="button"
            className="py-2 px-8 btn-primary"
            onClick={addToLibrary}
          >
            Add To Library
          </button>
        </div>
      </Section>

      {/* Start Carousel */}
      <p className="font-medium text-2xl lg:pl-52 py-14">
        <i className="fas fa-chevron-right fa-sm mr-4"></i>
        Set Content
      </p>
      <SetCarousel set={deck} />
      {/* End Carousel */}

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
