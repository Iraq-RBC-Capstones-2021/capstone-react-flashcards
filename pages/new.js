import { useState } from "react";
import { useDispatch } from "react-redux";

import CardEditors from "../components/CardEditors";
import NewSetForm from "../components/NewSetForm";
import SetSelect from "../components/SetSelect";
import { createNewSet } from "../store/sets/setsSlice";

const list = [
  {
    id: 1,
    title: "English Vocab",
  },
  {
    id: 2,
    title: "Algebra",
  },
  {
    id: 3,
    title: "Human Muscles",
  },
  {
    id: 4,
    title: "Japanese Katakana",
  },
];

export default function CreateCard() {
  const dispatch = useDispatch();

  const [currentSet, setCurrentSet] = useState({});

  const [frontContent, setFrontContent] = useState("");
  const [backContent, setBackContent] = useState("");

  const [isNewSet, setIsNewSet] = useState(false);

  const handleCardSwitch = () => {
    const front = frontContent;
    const back = backContent;

    setFrontContent(back);
    setBackContent(front);
  };

  const handleCardContentChange = (editor, pos) => {
    switch (pos) {
      case "front":
        setFrontContent(editor.getHTML());
        break;
      case "back":
        setBackContent(editor.getHTML());

        break;
    }
  };

  const handleSetSelect = (selectedSet) => {
    setCurrentSet(selectedSet);
  };

  const handleNewSetInfo = (info) => {
    dispatch(createNewSet(info));
  };

  const handleCreateCard = () => {
    const data = {
      setId: currentSet.id,
      front: frontContent,
      back: backContent,
      images: null,
      audio: null,
    };

    // dispatch(addNewCard({ cardInfo: data }));
  };

  return (
    <div className="px-32 flex flex-col justify-between">
      <div className=" mt-10 mb-32 h-60">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold ml-2">
            {isNewSet ? "New Set" : "Choose From Current Sets"}
          </h2>
          <button
            className="btn-primary"
            onClick={() => setIsNewSet((prev) => !prev)}
          >
            {isNewSet ? "Cancel" : "+ New Set"}
          </button>
        </div>
        <div className="m-2">
          {isNewSet ? (
            <NewSetForm onSetInfoSubmit={handleNewSetInfo} />
          ) : (
            <SetSelect onSelect={handleSetSelect} setsList={list} />
          )}
        </div>
      </div>
      <CardEditors
        frontContent={frontContent}
        backContent={backContent}
        onContentChange={handleCardContentChange}
        onContentSwitch={handleCardSwitch}
        onSubmit={handleCreateCard}
        submitTitle="Create Flash Card"
      />
    </div>
  );
}
