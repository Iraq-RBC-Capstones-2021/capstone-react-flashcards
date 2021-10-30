import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSetToLibrary, removeSetFromLibrary } from "../store/sets/setsSlice";

export default function AddOrRemoveSetButton({ setId, className }) {
  const library = useSelector((state) => state.sets.data.library);
  const dispatch = useDispatch();

  const [isInLibrary, setIsInlibrary] = useState();

  useEffect(() => {
    if (library.some((set) => set.setId === setId)) {
      setIsInlibrary(true);
    } else {
      setIsInlibrary(false);
    }
  }, [setId, library]);

  const addOrRemoveSet = () => {
    if (isInLibrary) {
      dispatch(removeSetFromLibrary(setId));
    } else {
      dispatch(addSetToLibrary(setId));
    }
  };

  return (
    <button
      className={`btn-primary ${className}`}
      onClick={addOrRemoveSet}
      type="button"
    >
      {isInLibrary ? "Remove From Library" : "Add To Library"}
    </button>
  );
}
