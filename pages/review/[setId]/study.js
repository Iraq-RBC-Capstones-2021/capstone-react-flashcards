import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SetCarousel from "../../../components/SetCarousel";
import Image from "next/dist/client/image";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Study() {
  const router = useRouter();
  const { setId } = router.query;

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

  // get current set and it's cards
  async function getSetCards() {
    const q = query(collection(db, "cards"), where("setId", "==", setId));
    const querySnapshot = await getDocs(q);
    const cc = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      cc.push(doc.data());
    });
    setCards(cc);
  }
  console.log(cards);
  //

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  // get cards for this set
  // query(collection(db, "cities"), where("capital", "==", true));

  // useEffect(() => {
  //   async function getSetCards() {
  //     const querySnapshot = await getDocs(collection(db, "cards"));
  //     console.log(querySnapshot)
  //     setCards(querySnapshot.docs)
  //   }
  //   getSetCards()
  // }, [])

  function currentCard(num) {
    console.log(num);
  }

  // start recording user input

  useEffect(() => {
    if (setId != undefined) {
      getSetCards();
    }
  }, [setId]);

  return (
    <div>
      <div className="text-xs text-gray-500">Set ID: {setId}</div>

      <SetCarousel set={cards} getCurrentCard={currentCard} />
      <div className="flex  justify-center my-10">
        <button className=" focus:bg-red-300 btn-secondary">
          {" "}
          <Image
            style={{ marginLeft: "20px" }}
            src="/assets/svg/ic-false.svg"
            alt="incorrect"
            width={12}
            height={12}
          />{" "}
          Incorrect
        </button>
        <button className=" focus:bg-green-300 btn-secondary ml-20">
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

const cardsss = [
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
  {
    front: {
      title: "2",
      content: "Front of card 2",
      images: [],
      audios: [],
    },
    back: {
      title: "2",
      content: "Back side of card 2",
      images: [],
      audios: [],
    },
  },
  {
    front: {
      title: "3",
      content: "Front of card 3",
      images: [],
      audios: [],
    },
    back: {
      title: "3",
      content: " Back side of card 3",
      images: [],
      audios: [],
    },
  },
  {
    front: {
      title: "4",
      content: "Front of card 4",
      images: [],
      audios: [],
    },
    back: {
      title: "4",
      content: "Back side of card 4",
      images: [],
      audios: [],
    },
  },
  {
    front: {
      title: "5",
      content: "Front of card 5",
      images: [],
      audios: [],
    },
    back: {
      title: "5",
      content: "Back side of card 5",
      images: [],
      audios: [],
    },
  },
  {
    front: {
      title: "6",
      content: "Front of card 6",
      images: [],
      audios: [],
    },
    back: {
      title: "6",
      content: "Back side of card 6",
      images: [],
      audios: [],
    },
  },
];
