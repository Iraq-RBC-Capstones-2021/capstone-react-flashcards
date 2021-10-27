import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardEditors from "../components/CardEditors";
import NewSetForm from "../components/NewSetForm";
import SetSelect from "../components/SetSelect";
import Attachments from "../components/Attachments";
import { createNewSet, createNewCard } from "../store/sets/setsSlice";

export default function CreateCard() {
  const dispatch = useDispatch();

  const sets = useSelector((state) => state.sets.data.mine);

  const [currentSet, setCurrentSet] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const [frontContent, setFrontContent] = useState({
    text: "",
    images: [],
    audio: [],
  });

  const [backContent, setBackContent] = useState({
    text: "",
    images: [],
    audio: [],
  });

  const [isNewSet, setIsNewSet] = useState(false);

  const handleCardSwitch = () => {
    const front = frontContent;
    const back = backContent;

    setFrontContent(back);
    setBackContent(front);
  };

  const handleCardTextChange = (editor, pos) => {
    switch (pos) {
      case "front":
        setFrontContent((prev) => ({ ...prev, text: editor.getHTML() }));
        break;
      case "back":
        setBackContent((prev) => ({ ...prev, text: editor.getHTML() }));
        break;
    }
  };

  const handleCardFileChange = (e, pos) => {
    if (!e) return;

    const isImage = e.target.files[0].type.includes("image");
    const file = e.target.files[0];

    switch (pos) {
      case "front":
        if (isImage) {
          setFrontContent({
            ...frontContent,
            images: [...frontContent.images, file],
          });
        } else {
          setFrontContent({
            ...frontContent,
            audio: [...frontContent.audio, file],
          });
        }
        break;
      case "back":
        if (isImage) {
          setBackContent({
            ...backContent,
            images: [...backContent.images, file],
          });
        } else {
          setBackContent({
            ...backContent,
            audio: [...backContent.audio, file],
          });
        }
    }
  };

  const handleFileRemove = (file, pos) => {
    const isImage = file.type.includes("image");

    switch (pos) {
      case "front":
        if (isImage) {
          setFrontContent({
            ...frontContent,
            images: frontContent.images.filter((image) => image !== file),
          });
        } else {
          setFrontContent({
            ...frontContent,
            audio: frontContent.audio.filter((audio) => audio !== file),
          });
        }
        break;
      case "back":
        if (isImage) {
          setBackContent({
            ...backContent,
            images: backContent.images.filter((image) => image !== file),
          });
        } else {
          setBackContent({
            ...backContent,
            audio: backContent.audio.filter((audio) => audio !== file),
          });
        }
        break;

      default:
    }
  };

  const handleSetSelect = (selectedSet) => {
    setCurrentSet(selectedSet);
  };

  const handleNewSetInfo = (info) => {
    dispatch(createNewSet(info));
  };

  const handleCreateCard = () => {
    if (!currentSet.setId) {
      setErrorMessage("Please choose a set");
      return;
    }

    if (
      !frontContent.text &&
      frontContent.images.length <= 0 &&
      frontContent.audio.length <= 0 &&
      !backContent.text &&
      backContent.images.length <= 0 &&
      backContent.audio.length <= 0
    ) {
      setErrorMessage("Please add content");
      return;
    }

    setErrorMessage("");

    const data = {
      front: frontContent,
      back: backContent,
      setId: currentSet.setId,
    };

    dispatch(createNewCard(data));

    setFrontContent({
      text: "",
      images: [],
      audio: [],
    });
    setBackContent({
      text: "",
      images: [],
      audio: [],
    });

    setErrorMessage(`Flash Card Added To ${currentSet.title}`);
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
            <SetSelect onSelect={handleSetSelect} setsList={sets} />
          )}
        </div>
      </div>

      <Attachments
        front={frontContent}
        back={backContent}
        onFileRemove={handleFileRemove}
      />

      {errorMessage && (
        <h5 className="pl-16 mt-5 text-xl text-primary">{errorMessage}</h5>
      )}
      <CardEditors
        frontContent={frontContent}
        backContent={backContent}
        onContentChange={handleCardTextChange}
        onContentSwitch={handleCardSwitch}
        onFileChange={handleCardFileChange}
        onSubmit={handleCreateCard}
        submitTitle="Create Flash Card"
      />
    </div>
  );
}
