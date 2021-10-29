import Head from "next/head";
import Link from "next/link";
import Section from "../components/Section";
import Star from "../public/assets/svg/ic_star.svg";

export default function Home() {
  return (
    <div>
      <Head>
        <title>eduCards</title>
        <meta name="description" content="Make Flashcards Easily" />
        <link rel="icon" href="/assets/card-logo.ico" />
      </Head>

      <div>
        <div
          className="flex bg-top bg-cover justify-center bg-no-repeat w-full p-60"
          style={{ backgroundImage: `url(/assets/background-landingPage.png)` }}
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl pb-4">Make Flashcards Easily</h1>
            <p className="mx-4 w-96 text-center text-lg mb-8 opacity-50">
              Create, browse and study different flashcards for studying or
              entertainment.
            </p>
            <Link href="/register">
              <a className="btn-secondary">Get Started</a>
            </Link>
          </div>
        </div>

        <div className="lg:p-20 pt-52">
          <Section
            title="Create, browse and study"
            titleIcon={Star}
            desc="Start by creating customizable flashcards or you can browse flashcards in any subject and find what you want. Then, start studying."
            isVideo={false}
            image="/assets/cards-set.png"
          />
        </div>

        <div className="lg:p-20">
          <Section
            title="Use images and sounds"
            titleIcon={Star}
            desc="Are you a visual or auditory learner? Add images and sounds for the flashcards to improve your learning."
            isVideo={false}
            image="/assets/image-and-sounds.png"
            reverse
          />
        </div>

        <div className="lg:p-20">
          <Section
            title="See your performance"
            titleIcon={Star}
            desc="Seeing how well you do, gives you a real boost. With an extensive set of statistical evaluations, you can see how well you performed at any time . "
            isVideo={false}
            image="/assets/progress.png"
          />
        </div>
      </div>
    </div>
  );
}
