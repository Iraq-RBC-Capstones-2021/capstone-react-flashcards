import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SetCarousel from "../../../components/SetCarousel";
import Image from "next/dist/client/image";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSet,
  recordCorrect,
  recordIncorrect,
} from "../../../store/history/historySlice";
import CarouselCard from "../../../components/CarouselCard";

export default function Study() {
  const router = useRouter();
  const { setId } = router.query;

  // Get userUID
  const userUID = "4IuX8X4Rj9fg1fGyHq9DujOSoKq1";

  const [cards, setCards] = useState(dd);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // get set cards
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentSet({ setId: setId }));
  }, [dispatch, setId]);

  function changeCard() {
    setCurrentCardIndex((prev) => prev + 1);
  }

  function correct() {
    changeCard();
    // dispatch(
    //   recordCorrect({
    //     setId: setId,
    //     userUID: userUID,
    //     currentCardIndex: currentCardIndex,
    //     cardId: cardsIds[currentCardIndex],
    //   })
    // );
  }

  function incorrect() {
    changeCard();
    // dispatch(
    //   recordIncorrect({
    //     setId: setId,
    //     userUID: userUID,
    //     currentCardIndex: currentCardIndex,
    //     cardId: cardsIds[currentCardIndex],
    //   })
    // );
  }

  return (
    <div>
      <SetCarousel set={cards} />
      {/* <FlashCardTwo  /> */}
      {/* <FlashCard card={cards[currentCardIndex]} /> */}
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

function FlashCard({ card }) {
  return (
    <div className="border-2 border-solid border-black shadow drop-shadow rounded h-128 w-144 flex flex-col items-center justify-center">
      <h1>{card.front.text}</h1>
      {card.images > 0 ? (
        <Image src={card.front.images[0]} width={20} height={20} alt="" />
      ) : null}
    </div>
  );
}

const oneCard = {
  setId: "SINMBojDqh7kteQ9aAQI",
  back: {
    images: [
      "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
    ],
    text: "Because it is a native module.",
    audio: [
      "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Because%20it%20is%20a%20native%20module..mp3?alt=media&token=9644163f-bf35-4942-87dd-54c2315e4a2a",
    ],
  },
  front: {
    audio: [
      "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Why%20is%20this%20code%20running%20without%20dot%20forward%20slash%20without%20throwing%20an%20error%20.mp3?alt=media&token=ce008686-816b-4e33-9432-1664df539aec",
    ],
    images: [
      "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
    ],
    text: "Why is this code running without './' without throwing an error?  var util=require('util');",
  },
};

const deck = [
  {
    front: {
      text: "flashcard 1",
      content: "some text1",
      images: [
        "https://cdn.pixabay.com/photo/2018/10/13/08/39/hohenschwangau-3743780_960_720.jpg",
      ],
    },
    back: {
      text: "flashcardss 1",
      content: "some text11",
      images: [
        "https://cdn.pixabay.com/photo/2020/12/23/14/01/river-5855081_960_720.jpg",
      ],
    },
  },
  {
    front: {
      text: "flashcard 2",
      content: "some text2",
      images: [
        "https://cdn.pixabay.com/photo/2021/10/10/10/45/fog-6696312_960_720.jpg",
      ],
    },
    back: {
      text: "flashcardss 2",
      content: "some text22",
      images: [
        "https://cdn.pixabay.com/photo/2018/10/13/08/39/hohenschwangau-3743780_960_720.jpg",
      ],
    },
  },
];

const dd = [
  {
    setId: "SINMBojDqh7kteQ9aAQI",
    back: {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
      ],
      text: "Because it is a native module.",
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Because%20it%20is%20a%20native%20module..mp3?alt=media&token=9644163f-bf35-4942-87dd-54c2315e4a2a",
      ],
    },
    front: {
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Why%20is%20this%20code%20running%20without%20dot%20forward%20slash%20without%20throwing%20an%20error%20.mp3?alt=media&token=ce008686-816b-4e33-9432-1664df539aec",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
      ],
      text: "Why is this code running without './' without throwing an error?  var util=require('util');",
    },
  },
  {
    front: {
      text: "What is machine code (lang)?",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
      ],
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/What%20is%20machine%20code%20.mp3?alt=media&token=7b38e8a1-c11c-436b-8fa3-ede1cd163467",
      ],
    },
    back: {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
      ],
      text: "Programming languages spoken by computer processors.",
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Programming%20languages%20spoken%20by%20computer%20processors..mp3?alt=media&token=7bbd0047-769c-4c2a-8046-e262c7b4f53b",
      ],
    },
    setId: "SINMBojDqh7kteQ9aAQI",
  },
  {
    back: {
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/An%20agreed%20upon%20standard%20for%20how%20code%20modules%20should%20be%20structured..mp3?alt=media&token=ec0103eb-d13e-44eb-b429-a533f2f7ff14",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
      ],
      text: "An agreed upon standard for how code modules should be structured.",
    },
    setId: "SINMBojDqh7kteQ9aAQI",
    front: {
      text: "What are commonJs modules?",
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/What%20are%20commonJs%20modules%20.mp3?alt=media&token=2002cf93-e0ac-44d9-9b75-fcf5d60c7688",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
      ],
    },
  },
  {
    setId: "SINMBojDqh7kteQ9aAQI",
    back: {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
      ],
      text: "Because it is a native module.",
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Because%20it%20is%20a%20native%20module..mp3?alt=media&token=9644163f-bf35-4942-87dd-54c2315e4a2a",
      ],
    },
    front: {
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Why%20is%20this%20code%20running%20without%20dot%20forward%20slash%20without%20throwing%20an%20error%20.mp3?alt=media&token=ce008686-816b-4e33-9432-1664df539aec",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
      ],
      text: "Why is this code running without './' without throwing an error?  var util=require('util');",
    },
  },
  {
    setId: "SINMBojDqh7kteQ9aAQI",
    back: {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
      ],
      text: "Because it is a native module.",
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Because%20it%20is%20a%20native%20module..mp3?alt=media&token=9644163f-bf35-4942-87dd-54c2315e4a2a",
      ],
    },
    front: {
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Why%20is%20this%20code%20running%20without%20dot%20forward%20slash%20without%20throwing%20an%20error%20.mp3?alt=media&token=ce008686-816b-4e33-9432-1664df539aec",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
      ],
      text: "Why is this code running without './' without throwing an error?  var util=require('util');",
    },
  },
  {
    setId: "SINMBojDqh7kteQ9aAQI",
    back: {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/node%20back.png?alt=media&token=3741b079-b001-492d-b05a-50b00a3892ed",
      ],
      text: "Because it is a native module.",
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Because%20it%20is%20a%20native%20module..mp3?alt=media&token=9644163f-bf35-4942-87dd-54c2315e4a2a",
      ],
    },
    front: {
      audio: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Why%20is%20this%20code%20running%20without%20dot%20forward%20slash%20without%20throwing%20an%20error%20.mp3?alt=media&token=ce008686-816b-4e33-9432-1664df539aec",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/educards-23b77.appspot.com/o/Node%20front.png?alt=media&token=f29e6156-155e-431d-b789-108271b8006b",
      ],
      text: "Why is this code running without './' without throwing an error?  var util=require('util');",
    },
  },
];
