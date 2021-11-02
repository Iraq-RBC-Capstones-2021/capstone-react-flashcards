import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import CardEditors from "../components/CardEditors";
import NewSetForm from "../components/NewSetForm";
import SetSelect from "../components/SetSelect";
import Attachments from "../components/Attachments";
import {
  createNewSet,
  createNewCard,
  getTotalSets,
} from "../store/sets/setsSlice";

export default function CreateCard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const sets = useSelector((state) => state.sets.data.mine);

  const userInfo = useSelector((state) => state.user.data);

  const pageStatus = useSelector((state) => state.sets.status);

  const [currentSet, setCurrentSet] = useState(null);

  const [searchValueSet, setSearchValueSet] = useState("");

  const [feedbackMessage, setFeedbackMessage] = useState("");

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

  const handleSearchValueSet = (value) => {
    setSearchValueSet(value);
  };

  const handleNewSetInfo = (info) => {
    dispatch(createNewSet(info));

    setCurrentSet("");

    setFeedbackMessage(`${info.title} set has been created`);
  };

  const handleCreateCard = () => {
    if (!currentSet) {
      setFeedbackMessage("Please choose a set");
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
      setFeedbackMessage("Please add content");
      return;
    }

    setFeedbackMessage("");

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

    setFeedbackMessage(`Flash Card Added To ${currentSet.title}`);
  };

  useEffect(() => {
    if (
      Object.prototype.toString.call(currentSet) === "[object String]" &&
      !isNewSet
    ) {
      const { title } = sets[sets.length - 1];
      setCurrentSet(sets[sets.length - 1]);
      setSearchValueSet(title);
    }
  }, [sets, currentSet, isNewSet]);

  useEffect(() => {
    if (searchValueSet === "") {
      setCurrentSet(null);
    }
  }, [searchValueSet]);

  useEffect(() => {
    dispatch(getTotalSets());
  }, [dispatch, sets]);

  useEffect(() => {
    if (!userInfo) {
      router.push("/signin");
    }
  }, [userInfo, router]);

  if (pageStatus === "loading") return <h1>Loading....</h1>;

  if (pageStatus === "error") setFeedbackMessage("Something Went Wrong");

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
            <SetSelect
              onSelect={handleSetSelect}
              setsList={sets}
              searchValue={searchValueSet}
              onSearchValueChange={handleSearchValueSet}
            />
          )}
        </div>
      </div>

      {feedbackMessage && (
        <h5 className="text-xl mb-5 text-primary">{feedbackMessage}</h5>
      )}

      <Attachments
        front={frontContent}
        back={backContent}
        onFileRemove={handleFileRemove}
      />

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
